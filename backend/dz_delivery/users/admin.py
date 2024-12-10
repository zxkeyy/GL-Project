from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'full_name', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('email', 'full_name')
    ordering = ('email',)

    # Add custom fields to the add user form
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'password1', 'password2')}
        ),
    )

    # Specify the fields to be used when editing a user
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('full_name',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'user_permissions', 'groups')}),
        ('Important dates', {'fields': ('last_login',)}),
    )

    # Optional: You can exclude the "password" field from the list_display
    readonly_fields = ('last_login',)

# Register the custom user admin and unregister the default Group model
admin.site.register(User, CustomUserAdmin)
admin.site.unregister(Group)  # If you don't need to use groups in the admin
