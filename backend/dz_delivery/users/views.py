from django.shortcuts import render
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction
from django.utils import timezone

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

    @action(detail=True, methods=['post'], permission_classes=[IsAdminOrReviewer], serializer_class=DocumentReviewSerializer)
    def review(self, request, pk=None):
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

            # Check if all required documents are approved
            user = document.user
            required_docs = DocumentType.objects.filter(is_required=True)
            all_approved = all(
                Document.objects.filter(
                    user=user,
                    document_type=doc_type,
                    status=Document.APPROVED
                ).exists()
                for doc_type in required_docs
            )

            # Update user's verification status
            user.is_verified = all_approved
            user.save()

            return Response({
                'status': 'success',
                'all_documents_approved': all_approved
            })
    
    @action(detail=False, methods=['get'])
    def required_documents(self, request):
        required_types = DocumentType.objects.filter(is_required=True)
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