from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register('drivers', views.DriverViewSet)
router.register('service-areas', views.ServiceAreaViewSet)
router.register('packages', views.PackageViewSet)
router.register('deliveries', views.DeliveryViewSet)
router.register('delivery-status', views.DeliveryStatusViewSet)

urlpatterns = router.urls