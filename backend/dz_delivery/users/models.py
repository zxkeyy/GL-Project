from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email address', unique=True)
    phone_number = models.CharField('phone number', max_length=15, null=True)
    full_name = models.CharField('full name', max_length=255, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    objects = UserManager()

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return self.full_name

    def get_short_name(self):
        return self.full_name.split()[0] if self.full_name else self.email


# Phone number verification model
class PhoneVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='phone_numbers')
    phone_number = models.CharField('phone number', max_length=15)
    code = models.CharField('verification code', max_length=6)
    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.phone_number}: {self.code}"

    class Meta:
        verbose_name = 'Phone Verification'
        verbose_name_plural = 'Phone Verifications'
        ordering = ['-created_at']