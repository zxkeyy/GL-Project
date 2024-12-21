from django.forms import ValidationError
from djoser.serializers import UserCreateSerializer, UserSerializer

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Document, DocumentType
from .backend import PhoneVerificationBackend

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'full_name', 'password')


class UserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'email', 'phone_number', 'full_name', 'is_active', 'is_client_verified', 'is_courier_verified')
        read_only_fields = ('email' ,'phone_number', 'is_active', 'is_client_verified', 'is_courier_verified')


class TokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # custom claims
        token['fullname'] = user.full_name
        token['is_active'] = user.is_active
        token['is_verified'] = user.is_verified
        token['email'] = user.email

        return token


# Phone number verification serializers
class PhoneVerificationSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    code = serializers.CharField(max_length=6)

    def validate(self, attrs):
        attrs = super().validate(attrs)
        phone_number = attrs.get('phone_number', None)
        code = attrs.get('code', None)

        backend = PhoneVerificationBackend()

        verification = backend.verify_phone_number(self.context['request'].user, phone_number, code)

        if verification == PhoneVerificationBackend.SECURITY_CODE_INVALID:
            raise serializers.ValidationError('Invalid security code.')
        if verification == PhoneVerificationBackend.SECURITY_CODE_EXPIRED:
            raise serializers.ValidationError('Security code has expired.')
        if verification == PhoneVerificationBackend.SECURITY_CODE_VERIFIED:
            raise serializers.ValidationError('Security code has already been verified.')
        
        return attrs

class PhoneSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)


# Document verification serializers
class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = ['id', 'name', 'code', 'description', 'is_client_required', 'is_courier_required']

class DocumentSerializer(serializers.ModelSerializer):
    document_type_details = DocumentTypeSerializer(source='document_type', read_only=True)

    class Meta:
        model = Document
        fields = ['id', 'document_type', 'document_type_details', 'file', 'status', 'reviewer_notes', 'created_at']
        read_only_fields = ['reviewer_notes', 'status', 'created_at']
    
    def validate(self, data):
        # Check if there's an existing pending or approved document
        existing_doc = Document.objects.filter(
            user=self.context['request'].user,
            document_type=data['document_type'],
            status__in=['pending', 'approved']
        ).first()

        if existing_doc:
            raise ValidationError(
                f"A {existing_doc.get_status_display().lower()} document of this type already exists. "
                f"Please wait for review before resubmission."
            )

        return data
    
    def validate_file(self, value):
        if value.size > MAX_FILE_SIZE:
            raise serializers.ValidationError("File size too large. Max size is 10MB.")
        return value

class DocumentReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ['status', 'reviewer_notes']

    def validate_status(self, value):
        if value not in [Document.APPROVED, Document.REJECTED]:
            raise serializers.ValidationError("Invalid status.")
        return value