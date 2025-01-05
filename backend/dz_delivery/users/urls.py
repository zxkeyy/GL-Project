from rest_framework.routers import DefaultRouter

from .views import UserViewSet, DocumentViewSet, PhoneVerificationView

router = DefaultRouter()

router.register('phone', PhoneVerificationView, basename='phone')
router.register('documents', DocumentViewSet, basename='documents')
router.register('users', UserViewSet)

urlpatterns = router.urls