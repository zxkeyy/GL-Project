from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .backend import PhoneVerificationBackend

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'full_name', 'password')


class UserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'email', 'phone_number', 'full_name', 'is_active', 'is_verified')


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


# Phone number verification serializer
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