from rest_framework.routers import DefaultRouter

from .views import PhoneVerificationView

router = DefaultRouter()

router.register('phone', PhoneVerificationView, basename='phone')

urlpatterns = router.urls