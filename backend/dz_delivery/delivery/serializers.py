import random
from rest_framework import serializers
from django.contrib.auth import get_user_model

from users.serializers import UserSerializer
from .models import Address, Delivery, DeliveryStatus, Driver, Package, ServiceArea

class ServiceAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceArea
        fields = ['id', 'name', 'boundaries', 'base_fee', 
                 'price_per_km', 'is_active']


class DriverSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    service_areas = ServiceAreaSerializer(many=True)
    completion_rate = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Driver
        fields = ['id', 'user', 'vehicle_type', 'vehicle_plate', 
                 'current_location', 'service_areas', 'rating', 
                 'total_deliveries', 'successful_deliveries', 
                 'completion_rate', 'available', 'last_active']
        read_only_fields = ['rating', 'total_deliveries', 
                           'successful_deliveries', 'last_active']
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = get_user_model().objects.create_user(**user_data)
        driver = Driver.objects.create(user=user, **validated_data)
        return driver


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['unit', 'building_type', 'street', 'city', 'state', 'postal_code', 'latitude', 'longitude']
        read_only_fields = []

class PackageSerializer(serializers.ModelSerializer):
    delivery_progress = serializers.IntegerField(read_only=True)
    sender = UserSerializer(read_only=True)
    pickup_address = AddressSerializer()
    delivery_address = AddressSerializer()
    current_address = AddressSerializer(read_only=True)
    
    class Meta:
        model = Package
        fields = ['id', 'tracking_number', 'sender', 'recipient_name',
                 'recipient_phone', 'recipient_email', 'pickup_address',
                 'delivery_address', 'current_address', 'status', 'verification_code',
                 'weight', 'dimensions', 'priority', 'is_fragile',
                 'requires_signature', 'cost', 'insurance_amount', 'notes',
                'delivery_progress', 'created_at']
        read_only_fields = ['status', 'current_address', 'cost', 'insurance_amount', 'tracking_number', 'verification_code', 
                           'created_at']
        
    def create(self, validated_data):
        pickup_address_data = validated_data.pop('pickup_address')
        delivery_address_data = validated_data.pop('delivery_address')
        sender = self.context['request'].user
        
        # Create address instances first
        pickup_address = Address.objects.create(**pickup_address_data)
        delivery_address = Address.objects.create(**delivery_address_data)
        
        # Create package instance with addresses
        package = Package.objects.create(

            pickup_address=pickup_address,
            delivery_address=delivery_address,
            **validated_data
        )
        
        return package

    def validate_dimensions(self, value):
        required_keys = {'length', 'width', 'height'}
        if not all(key in value for key in required_keys):
            raise serializers.ValidationError(
                "Dimensions must include length, width, and height"
            )
        return value
    
    def generate_verification_code(self):
        return random.randint(100000, 999999)


class PackageListSerializer(PackageSerializer):
    sender = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta(PackageSerializer.Meta):
        fields = ['id', 'recipient_name', 'recipient_phone', 'weight', 'dimensions', 'is_fragile', 'requires_signature', 'notes', ]


class PackageTrackingSerializer(serializers.ModelSerializer):
    current_address = AddressSerializer(read_only=True)
    class Meta:
        model = Package
        fields = ['tracking_number', 'status', 'current_address', 'delivery_progress']
        read_only_fields = ['tracking_number', 'status', 'current_address', 'delivery_progress']


class DeliveryStatusSerializer(serializers.ModelSerializer):
    location = AddressSerializer()
    class Meta:
        model = DeliveryStatus
        fields = ['id', 'delivery', 'status', 'location', 
                 'notes', 'updated_by', 'created_at']
        read_only_fields = ['delivery', 'updated_by', 'created_at']


class DeliverySerializer(serializers.ModelSerializer):
    driver = DriverSerializer(read_only=True)
    status_updates = DeliveryStatusSerializer(many=True, read_only=True)
    is_delayed = serializers.BooleanField(read_only=True)
    delivery_duration = serializers.DurationField(read_only=True)
    pickup_address = AddressSerializer()
    dropoff_address = AddressSerializer()
    
    class Meta:
        model = Delivery
        fields = ['id', 'package', 'driver', 'service_area', 'status',
                 'base_fee', 'distance_fee', 'additional_fees',
                 'total_amount', 'estimated_pickup_time',
                 'estimated_delivery_time', 'actual_pickup_time',
                 'actual_delivery_time', 'pickup_address', 'dropoff_address', 'route_info', 'distance',
                 'driver_rating',
                 'driver_feedback', 'status_updates', 'is_delayed',
                 'delivery_duration', 'created_at']
        read_only_fields = ['driver', 'estimated_pickup_time',
                 'estimated_delivery_time', 'actual_pickup_time',
                 'actual_delivery_time', 'total_amount', 'created_at']

    def validate(self, data):
        if data['estimated_pickup_time'] >= data['estimated_delivery_time']:
            raise serializers.ValidationError(
                "Estimated pickup time must be before delivery time"
            )
        return data


class DeliveryListSerializer(DeliverySerializer):
    package = PackageListSerializer(read_only=True)
    driver = serializers.PrimaryKeyRelatedField(read_only=True)
    status_updates = DeliveryStatusSerializer(many=True, read_only=True)
    pickup_address = AddressSerializer(read_only=True)
    dropoff_address = AddressSerializer(read_only=True)
    
    class Meta(DeliverySerializer.Meta):
        fields = ['id', 'package', 'driver', 'status',
                 'base_fee', 'distance_fee', 'additional_fees',
                 'total_amount', 'pickup_address', 'dropoff_address', 'route_info', 'distance', 'service_area']


class EmptySerializer(serializers.Serializer):
    pass