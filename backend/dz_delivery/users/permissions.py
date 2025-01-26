from rest_framework import permissions

class IsActive(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_active

class IsVerified(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_verified

class IsAdminOrReviewer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.user.is_staff or request.user.has_perm('can_review_documents'))

class IsAdminOrDriver(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.user.is_staff or request.user.is_driver_verified)

class IsAdminOrClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and (request.user.is_staff or request.user.is_client_verified)