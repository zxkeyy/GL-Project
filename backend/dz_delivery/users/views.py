from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .permissions import IsActive
from .serializers import PhoneSerializer, PhoneVerificationSerializer
from .services import create_phone_verification_and_send_code

# Phone number verification view
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