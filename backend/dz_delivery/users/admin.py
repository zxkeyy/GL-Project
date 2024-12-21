from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import Document, DocumentType, PhoneVerification, User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'full_name', 'phone_number', 'is_staff', 'is_active', 'is_verified')
    list_filter = ('is_staff', 'is_active', 'is_verified')
    search_fields = ('email', 'phone_number', 'full_name')
    ordering = ('email',)

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'password1', 'password2')}
        ),
    )

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('full_name', 'phone_number',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_verified', 'user_permissions', 'groups')}),
        ('Important dates', {'fields': ('last_login',)}),
    )

    readonly_fields = ('last_login',)

# Register the custom user admin
admin.site.register(User, CustomUserAdmin)


@admin.register(PhoneVerification)
class PhoneVerificationAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'code', 'is_verified', 'created_at', 'updated_at')
    list_filter = ('is_verified',)
    search_fields = ('phone_number', 'code')
    ordering = ('-created_at',)

    readonly_fields = ('created_at', 'updated_at')

@admin.register(DocumentType)
class DocumentTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'is_required')
    search_fields = ('name', 'code')
    ordering = ('name',)

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('user', 'document_type', 'status', 'created_at', 'updated_at')
    list_filter = ('status', 'document_type')
    search_fields = ('user__email', 'document_type__name')
    ordering = ('-created_at',)

    readonly_fields = ('created_at', 'updated_at')