from rest_framework.routers import DefaultRouter

from .views import DocumentViewSet, PhoneVerificationView

router = DefaultRouter()

router.register('phone', PhoneVerificationView, basename='phone')
router.register('documents', DocumentViewSet, basename='documents')

urlpatterns = router.urls