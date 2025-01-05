from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from django.db.models import Q, Subquery, OuterRef
from django.utils import timezone

from users.permissions import IsAdminOrDriver

from .models import Driver, Delivery, Package, ServiceArea, DeliveryStatus
from .serializers import DeliverySerializer, DeliveryStatusSerializer, DriverSerializer, DeliveryListSerializer, EmptySerializer, PackageSerializer, PackageTrackingSerializer, ServiceAreaSerializer

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
        latest_status_subquery = DeliveryStatus.objects.filter(
            delivery=OuterRef('pk')
        ).order_by('-created_at').values('status')[:1]

        deliveries = Delivery.objects.filter(
            driver=driver,
            id__in=Subquery(
                DeliveryStatus.objects.filter(
                    delivery=OuterRef('pk'),
                    status__in=['REQUESTED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT']
                ).order_by('-created_at').values('delivery')[:1]
            )
        ).annotate(
            latest_status=Subquery(latest_status_subquery)
        ).filter(
            latest_status__in=['REQUESTED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT']
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
        return self.queryset.filter(sender=user)

    def perform_create(self, serializer):
        generated_code = serializer.generate_verification_code()
        serializer.save(sender=self.request.user, verification_code=generated_code)
        self.send_verification_code(serializer.instance)
    
    def send_verification_code(self, package):
        # Send verification code to recipient
        print(f"Verification code for package {package.tracking_number}: {package.verification_code}")
        return True
    
    @action(detail=False, methods=['get'])
    def my_packages(self, request):
        user = request.user
        packages = Package.objects.filter(sender=user)
        serializer = PackageSerializer(packages, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], serializer_class=EmptySerializer)
    def resend_verification_code(self, request, pk=None):
        package = self.get_object()
        self.send_verification_code(package)
        return Response({'status': 'verification code resent'})

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        package = self.get_object()
        if package.status not in ['REQUESTED', 'ASSIGNED']:
            raise ValidationError("Cannot cancel package at current status")
            
        package.status = 'CANCELLED'
        package.save()
        return Response({'status': 'package cancelled'})
    
    # tracking endpoint
    @action(detail=False, methods=['get'], serializer_class=PackageTrackingSerializer, permission_classes=[])
    def track(self, request):
        tracking_number = request.query_params.get('tracking_number')
        if not tracking_number:
            raise ValidationError("tracking_number is required")
            
        package = get_object_or_404(Package, tracking_number=tracking_number)
        serializer = PackageTrackingSerializer(package)
        return Response(serializer.data)


class DeliveryViewSet(viewsets.ModelViewSet):
    queryset = Delivery.objects.all()
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['package__status', 'driver']
    search_fields = ['package__tracking_number']

    def get_serializer_class(self):
        if self.action == 'list':
            return DeliveryListSerializer
        if self.action == 'accept' or self.action == 'verify_delivery':
            return EmptySerializer
        if self.action == 'update_status':
            return DeliveryStatusSerializer
        return DeliverySerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return self.queryset
        return self.queryset
    
    @action(detail=False, methods=['get'])
    def available_deliveries(self, request):
        deliveries = Delivery.objects.filter(package__status='REQUESTED')
        serializer = DeliveryListSerializer(deliveries, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAdminOrDriver])
    def accept(self, request, pk=None):
        delivery = self.get_object()
        driver = get_object_or_404(Driver, user=request.user)

        if delivery.package.status != 'REQUESTED':
            raise ValidationError("Delivery is not available for acceptance")
            
        if delivery.driver:
            raise ValidationError("Delivery has already been accepted by another driver")
            
        delivery.driver = driver
        delivery.package.status = 'ASSIGNED'
        delivery.save()
        return Response({'status': 'delivery accepted'})

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        # need to add validation for status transitions mba3d
        delivery = self.get_object()
        status = request.data.get('status')
        location = request.data.get('location')
        notes = request.data.get('notes', '')

        if not request.user.is_staff and request.user != delivery.driver.user:
            raise ValidationError("You are not authorized to update delivery status")

        if not status:
            raise ValidationError("status is required")
        
        if status == 'DELIVERED':
            raise ValidationError("use verify_delivery endpoint to mark delivery as delivered")

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
    
    @action(detail=False, methods=['get'])
    def delivery_history(self, request):
        user = request.user
        if user.is_staff:
            deliveries = self.queryset.all()
        else:
            deliveries = self.queryset.filter(driver__user=user)
        serializer = DeliveryListSerializer(deliveries, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def rate_delivery(self, request, pk=None):
        delivery = self.get_object()
        rating = request.data.get('rating')
        feedback = request.data.get('feedback', '')

        if delivery.status != 'DELIVERED':
            raise ValidationError("Delivery must be completed before rating")
        
        if not rating or not isinstance(rating, int) or rating < 1 or rating > 5:
            raise ValidationError("Valid rating (1-5) is required")

        user = request.user
        if user == delivery.driver.user:
            delivery.driver_rating = rating
            delivery.driver_feedback = feedback
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
    allowed_methods = ['GET']

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