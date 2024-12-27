from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import FileExtensionValidator
from django.db.models import Q

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email address', unique=True)
    phone_number = models.CharField('phone number', max_length=15, null=True)
    full_name = models.CharField('full name', max_length=255, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_client_verified = models.BooleanField(default=False)
    is_driver_verified = models.BooleanField(default=False)

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


# Document versioning models
class DocumentType(models.Model):
    name = models.CharField(max_length=100)  # e.g., 'Passport', 'Driver License'
    code = models.SlugField(unique=True)  # e.g., 'passport', 'driver_license'
    description = models.TextField()
    is_client_required = models.BooleanField(default=False)
    is_driver_required = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-is_driver_required', '-is_client_required', 'name']

class Document(models.Model):
    PENDING = 'pending'
    APPROVED = 'approved'
    REJECTED = 'rejected'
    
    STATUS_CHOICES = [
        (PENDING, 'Pending Review'),
        (APPROVED, 'Approved'),
        (REJECTED, 'Rejected'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    document_type = models.ForeignKey(DocumentType, on_delete=models.PROTECT)
    file = models.FileField(
        upload_to='verification_documents/%Y/%m/%d/',
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'jpg', 'jpeg', 'png'])]
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)

    reviewer_notes = models.TextField(blank=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    reviewed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='reviewed_documents'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        constraints = [
            # Only one pending or approved document per type per user
            models.UniqueConstraint(
                fields=['user', 'document_type'],
                condition=Q(status__in=['pending', 'approved']),
                name='unique_active_document'
            )
        ]