from django.shortcuts import render
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction
from django.utils import timezone
from django.db.models import Q

from .models import Document, DocumentType
from .permissions import IsActive, IsAdminOrReviewer
from .serializers import DocumentReviewSerializer, DocumentSerializer, DocumentTypeSerializer, PhoneSerializer, PhoneVerificationSerializer
from .services import create_phone_verification_and_send_code

# Phone number verification views
class PhoneVerificationView(viewsets.GenericViewSet):
    @action(detail=False, methods=['post'], permission_classes=[IsActive], serializer_class=PhoneSerializer)
    def register(self, request):
        serializer = PhoneSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        create_phone_verification_and_send_code(request.user, serializer.validated_data['phone_number'])
        return Response({'detail': 'Phone number registered successfully.'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], permission_classes=[IsActive], serializer_class=PhoneVerificationSerializer)
    def verify(self, request):
        serializer = PhoneVerificationSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response({'detail': 'Phone number verified successfully.'}, status=status.HTTP_200_OK)


# Document views
class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [IsActive]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.has_perm('can_review_documents'):
            return Document.objects.all()
        return Document.objects.filter(user=user)

    def perform_create(self, serializer):
        try:
            with transaction.atomic():
                # The serializer.validate() already ensures no pending/approved docs exist
                document = serializer.save(
                    user=self.request.user,
                    status=Document.PENDING
                )
                return document

        except Exception as e:
            raise serializers.ValidationError(
                "Unable to process document submission. Please try again."
            )
    
    def update(self, request, *args, **kwargs):
        document = self.get_object()
        if document.user != request.user:
            return Response(
                {'error': 'You do not have permission to update this document'},
                status=status.HTTP_403_FORBIDDEN
            )
        if document.status != Document.PENDING:
            return Response(
                {'error': 'Only pending documents can be updated'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().update(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        document = self.get_object()
        if document.user != request.user:
            return Response(
                {'error': 'You do not have permission to update this document'},
                status=status.HTTP_403_FORBIDDEN
            )
        if document.status != Document.PENDING:
            return Response(
                {'error': 'Only pending documents can be updated'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().partial_update(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def document_history(self, request):
        document_type_id = request.query_params.get('document_type')
        if not document_type_id:
            return Response(
                {'error': 'document_type parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        documents = self.get_queryset().filter(
            document_type_id=document_type_id
        ).order_by('-created_at')

        return Response(self.get_serializer(documents, many=True).data)
    
    def _update_user_verification_status(self, document):
        user = document.user

        required_docs = DocumentType.objects.filter(Q(is_client_required=True) | Q(is_courier_required=True))
        client_required_docs = set(doc.id for doc in required_docs if doc.is_client_required)
        courier_required_docs = set(doc.id for doc in required_docs if doc.is_courier_required)
        user_docs = Document.objects.filter(user=user, status=Document.APPROVED).values_list('document_type_id', flat=True)
        user_docs_set = set(user_docs)
        
        client_approved = client_required_docs.issubset(user_docs_set)
        courier_approved = courier_required_docs.issubset(user_docs_set)

        # Update user's verification status
        user.is_client_verified = client_approved
        user.is_courier_verified = courier_approved
        user.save()

        return client_approved, courier_approved

    @action(detail=True, methods=['post'], permission_classes=[IsAdminOrReviewer], serializer_class=DocumentReviewSerializer)
    def review(self, request, pk=None):
        try:
            with transaction.atomic():
                document = self.get_object()
                status_choice = request.data.get('status')
                notes = request.data.get('reviewer_notes', '')

                if status_choice not in [Document.APPROVED, 
                                       Document.REJECTED]:
                    return Response(
                        {'error': 'Invalid status'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                document.status = status_choice
                document.reviewer_notes = notes
                document.reviewed_at = timezone.now()
                document.reviewed_by = request.user
                document.save()

                client_approved, courier_approved = self._update_user_verification_status(document)
        
                return Response({
                    'status': 'success',
                    'courier_approved': courier_approved,
                    'client_approved': client_approved
                })
        except Exception as e:
            return Response(
                {'error': 'An error occurred during the transaction.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'])
    def client_required_documents(self, request):
        required_types = DocumentType.objects.filter(is_client_required=True)
        user_documents = self.get_queryset()
        
        result = []
        for doc_type in required_types:
            user_doc = user_documents.filter(document_type=doc_type).first()
            result.append({
                'document_type': DocumentTypeSerializer(doc_type).data,
                'status': user_doc.status if user_doc else None,
                'uploaded': user_doc is not None
            })
        
        return Response(result)

    @action(detail=False, methods=['get'])
    def courier_required_documents(self, request):
        required_types = DocumentType.objects.filter(is_courier_required=True)
        user_documents = self.get_queryset()
        
        result = []
        for doc_type in required_types:
            user_doc = user_documents.filter(document_type=doc_type).first()
            result.append({
                'document_type': DocumentTypeSerializer(doc_type).data,
                'status': user_doc.status if user_doc else None,
                'uploaded': user_doc is not None
            })
        
        return Response(result)

    def destroy(self, request, *args, **kwargs):
        document = self.get_object()
        if document.user != request.user:
            return Response(
                {'error': 'You do not have permission to delete this document'},
                status=status.HTTP_403_FORBIDDEN
            )
        if document.status != Document.PENDING:
            return Response(
                {'error': 'Only pending documents can be deleted'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().destroy(request, *args, **kwargs)