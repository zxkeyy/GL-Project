from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.utils import timezone

from users.permissions import IsAdminOrDriver

from .models import Driver, Delivery, Package, ServiceArea, DeliveryStatus
from .serializers import DeliverySerializer, DeliveryStatusSerializer, DriverSerializer, DeliveryListSerializer, PackageSerializer, ServiceAreaSerializer

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [IsAuthenticated, IsAdminOrDriver]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['available', 'vehicle_type']
    search_fields = ['user__full_name', 'user__email', 'vehicle_plate']

    def get_queryset(self):
        if self.request.user.is_staff:
            return self.queryset
        return self.queryset.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_availability(self, request, pk=None):
        driver = self.get_object()
        driver.available = not driver.available
        driver.save()
        return Response({'available': driver.available})

    @action(detail=True, methods=['post'])
    def update_location(self, request, pk=None):
        driver = self.get_object()
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        
        if not all([latitude, longitude]):
            raise ValidationError("Both latitude and longitude are required")
            
        driver.update_location(latitude, longitude)
        return Response({'status': 'location updated'})

    @action(detail=True, methods=['get'])
    def current_deliveries(self, request, pk=None):
        driver = self.get_object()
        deliveries = Delivery.objects.filter(
            driver=driver,
            status__in=['ASSIGNED', 'PICKED_UP', 'IN_TRANSIT']
        )
        serializer = DeliveryListSerializer(deliveries, many=True)
        return Response(serializer.data)


class ServiceAreaViewSet(viewsets.ModelViewSet):
    queryset = ServiceArea.objects.all()
    serializer_class = ServiceAreaSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['status', 'priority', 'is_fragile']
    search_fields = ['tracking_number', 'recipient_name', 'recipient_phone']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return self.queryset
        return self.queryset.filter(
            Q(sender=user) | Q(delivery__driver__user=user)
        )

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        package = self.get_object()
        if package.status not in ['REQUESTED', 'ASSIGNED']:
            raise ValidationError("Cannot cancel package at current status")
            
        package.status = 'CANCELLED'
        package.save()
        return Response({'status': 'package cancelled'})


class DeliveryViewSet(viewsets.ModelViewSet):
    queryset = Delivery.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['status', 'driver']
    search_fields = ['package__tracking_number']

    def get_serializer_class(self):
        if self.action == 'list':
            return DeliveryListSerializer
        return DeliverySerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return self.queryset
        return self.queryset.filter(
            Q(package__sender=user) | Q(driver__user=user)
        )

    @action(detail=True, methods=['post'])
    def assign_driver(self, request, pk=None):
        delivery = self.get_object()
        driver_id = request.data.get('driver_id')
        
        if not driver_id:
            raise ValidationError("driver_id is required")
            
        driver = get_object_or_404(Driver, id=driver_id)
            
        delivery.driver = driver
        delivery.status = 'ASSIGNED'
        delivery.save()
        
        return Response({'status': 'driver assigned'})

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        delivery = self.get_object()
        status = request.data.get('status')
        location = request.data.get('location')
        notes = request.data.get('notes', '')

        if not status:
            raise ValidationError("status is required")

        if status not in [choice[0] for choice in Package.STATUS_CHOICES]:
            raise ValidationError("Invalid status")

        # Create status update
        DeliveryStatus.objects.create(
            delivery=delivery,
            status=status,
            location=location,
            notes=notes,
            updated_by=request.user
        )

        # Update delivery and package status
        delivery.package.status = status
        delivery.package.save()

        if status == 'PICKED_UP':
            delivery.actual_pickup_time = timezone.now()
        elif status == 'DELIVERED':
            delivery.actual_delivery_time = timezone.now()
        
        delivery.save()

        return Response({'status': 'delivery status updated'})

    @action(detail=True, methods=['post'])
    def rate_delivery(self, request, pk=None):
        delivery = self.get_object()
        rating = request.data.get('rating')
        feedback = request.data.get('feedback', '')
        
        if not rating or not isinstance(rating, int) or rating < 1 or rating > 5:
            raise ValidationError("Valid rating (1-5) is required")

        user = request.user
        if user == delivery.package.sender:
            delivery.driver_rating = rating
            delivery.driver_feedback = feedback
        elif user == delivery.driver.user:
            delivery.customer_rating = rating
            delivery.customer_feedback = feedback
        else:
            raise ValidationError("You are not authorized to rate this delivery")

        delivery.save()
        return Response({'status': 'rating submitted'})

    @action(detail=True, methods=['post'])
    def verify_delivery(self, request, pk=None):
        delivery = self.get_object()
        verification_code = request.data.get('verification_code')
        
        if not verification_code:
            raise ValidationError("verification_code is required")
            
        if delivery.package.verification_code != verification_code:
            raise ValidationError("Invalid verification code")
            
        if delivery.package.status != 'ARRIVED':
            raise ValidationError("Package must be arrived before verification")

        delivery.package.status = 'DELIVERED'
        delivery.package.save()
        
        delivery.actual_delivery_time = timezone.now()
        delivery.save()
        
        return Response({'status': 'delivery verified'})


class DeliveryStatusViewSet(viewsets.ModelViewSet):
    queryset = DeliveryStatus.objects.all()
    serializer_class = DeliveryStatusSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['delivery', 'status']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return self.queryset
        return self.queryset.filter(
            Q(delivery__package__sender=user) | 
            Q(delivery__driver__user=user)
        )

    def perform_create(self, serializer):
        serializer.save(updated_by=self.request.user)