from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.contrib.auth import get_user_model
from datetime import datetime, timedelta
import uuid

User = get_user_model()

phone_regex = RegexValidator(
    regex=r'^\+?1?\d{9,15}$',
    message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
)

class TimeStampedModel(models.Model):
    """Abstract base model with created and updated timestamps."""
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(_("Updated At"), auto_now=True)

    class Meta:
        abstract = True


class Address(models.Model):
    """Model to store address information."""
    street = models.CharField(_("Street Address"), max_length=255)
    unit = models.CharField(_("Unit/Apt"), max_length=20, null=True, blank=True)
    city = models.CharField(_("City"), max_length=100)
    state = models.CharField(_("State"), max_length=100)
    postal_code = models.CharField(_("Postal Code"), max_length=20)
    building_type = models.CharField(_("Building Type"), max_length=50, null=True, blank=True)

    latitude = models.FloatField(_("Latitude"), null=True, blank=True)
    longitude = models.FloatField(_("Longitude"), null=True, blank=True)

    class Meta:
        verbose_name = _("Address")
        verbose_name_plural = _("Addresses")
    
    def __str__(self):
        return f"{self.street}, {self.city}, {self.state} {self.postal_code}"

class ServiceArea(models.Model):
    """Model to define service areas with pricing."""
    name = models.CharField(_("Area Name"), max_length=100)
    boundaries = models.JSONField(_("Area Boundaries"))  # GeoJSON polygon
    base_fee = models.DecimalField(_("Base Fee"), max_digits=10, decimal_places=2)
    price_per_km = models.DecimalField(_("Price per Kilometer"), max_digits=5, decimal_places=2)
    is_active = models.BooleanField(_("Active"), default=True)

    class Meta:
        verbose_name = _("Service Area")
        verbose_name_plural = _("Service Areas")

    def __str__(self):
        return self.name

class Driver(TimeStampedModel):
    """Model for delivery drivers with verification and current status."""
    VEHICLE_TYPES = [
        ('BICYCLE', _('Bicycle')),
        ('MOTORCYCLE', _('Motorcycle')),
        ('CAR', _('Car')),
        ('VAN', _('Van')),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='driver_profile'
    )
    vehicle_type = models.CharField(_("Vehicle Type"), max_length=50, choices=VEHICLE_TYPES)
    vehicle_plate = models.CharField(_("Vehicle Plate"), max_length=20)
    current_location = models.JSONField(_("Current Location"), null=True, blank=True)
    service_areas = models.ManyToManyField(ServiceArea, related_name='drivers')
    rating = models.FloatField(
        _("Rating"),
        default=5.0,
        validators=[MinValueValidator(1.0), MaxValueValidator(5.0)]
    )
    total_deliveries = models.PositiveIntegerField(_("Total Deliveries"), default=0)
    successful_deliveries = models.PositiveIntegerField(_("Successful Deliveries"), default=0)
    available = models.BooleanField(_("Available"), default=False)
    last_active = models.DateTimeField(_("Last Active"), null=True, blank=True)
    bank_account_info = models.JSONField(_("Bank Account Info"), null=True, blank=True)

    class Meta:
        verbose_name = _("Driver")
        verbose_name_plural = _("Drivers")
        indexes = [
            models.Index(fields=['available']),
            models.Index(fields=['rating']),
        ]

    def __str__(self):
        return f"Driver: {self.user.get_full_name()}"

    @property
    def completion_rate(self):
        """Calculate the driver's delivery completion rate."""
        if self.total_deliveries == 0:
            return 100.0
        return (self.successful_deliveries / self.total_deliveries) * 100

    def update_location(self, latitude, longitude):
        """Update driver's current location."""
        self.current_location = {'lat': latitude, 'lng': longitude}
        self.last_active = datetime.now()
        self.save(update_fields=['current_location', 'last_active'])


class Package(TimeStampedModel):
    """Model for package information and tracking."""
    STATUS_CHOICES = [
        ('REQUESTED', _('Requested')),
        ('ASSIGNED', _('Assigned')),
        ('PICKED_UP', _('Picked Up')),
        ('IN_TRANSIT', _('In Transit')),
        ('ARRIVED', _('Arrived at Destination')),
        ('DELIVERED', _('Delivered')),
        ('FAILED', _('Failed Delivery')),
        ('CANCELLED', _('Cancelled')),
    ]

    PRIORITY_CHOICES = [
        ('STANDARD', _('Standard')),
        ('EXPRESS', _('Express')),
        ('SAME_DAY', _('Same Day')),
    ]

    tracking_number = models.UUIDField(
        _("Tracking Number"),
        default=uuid.uuid4,
        unique=True,
        editable=False
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='sent_packages'
    )
    recipient_name = models.CharField(_("Recipient Name"), max_length=100)
    recipient_phone = models.CharField(
        _("Recipient Phone"),
        max_length=15,
        validators=[phone_regex]
    )
    recipient_email = models.EmailField(_("Recipient Email"), null=True, blank=True)
    pickup_address = models.ForeignKey(Address, on_delete=models.PROTECT, related_name='pickup_packages')
    delivery_address = models.ForeignKey(Address, on_delete=models.PROTECT, related_name='delivery_packages')
    current_address = models.ForeignKey(Address, on_delete=models.PROTECT, related_name='current_packages', null=True, blank=True)
    status = models.CharField(
        _("Status"),
        max_length=20,
        choices=STATUS_CHOICES,
        default='REQUESTED'
    )
    verification_code = models.CharField(_("Verification Code"), max_length=6)
    weight = models.FloatField(
        _("Weight (kg)"),
        validators=[MinValueValidator(0.1), MaxValueValidator(20.0)]
    )
    dimensions = models.JSONField(_("Dimensions (cm)"))  # {length, width, height}
    priority = models.CharField(
        _("Priority"),
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='STANDARD'
    )
    is_fragile = models.BooleanField(_("Fragile"), default=False)
    requires_signature = models.BooleanField(_("Requires Signature"), default=False)
    cost = models.DecimalField(_("Cost"), max_digits=10, decimal_places=2, default=0.00)
    insurance_amount = models.DecimalField(
        _("Insurance Amount"),
        max_digits=10,
        decimal_places=2,
        default=0.00
    )
    notes = models.TextField(_("Delivery Notes"), blank=True)
    customer_rating = models.IntegerField(
        _("Customer Rating"),
        null=True,
        blank=True,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    customer_feedback = models.TextField(_("Customer Feedback"), blank=True)

    class Meta:
        verbose_name = _("Package")
        verbose_name_plural = _("Packages")
        indexes = [
            models.Index(fields=['tracking_number']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"Package {self.tracking_number}"

    @property
    def delivery_progress(self):
        """Calculate delivery progress percentage."""
        status_weights = {
            'REQUESTED': 0,
            'ASSIGNED': 20,
            'PICKED_UP': 40,
            'IN_TRANSIT': 60,
            'ARRIVED': 80,
            'DELIVERED': 100,
            'FAILED': 0,
            'CANCELLED': 0
        }
        return status_weights.get(self.status, 0)


class Delivery(TimeStampedModel):
    """Model for delivery assignment and tracking."""
    package = models.ForeignKey(
        Package,
        on_delete=models.PROTECT,
        related_name='deliveries'
    )
    driver = models.ForeignKey(
        Driver,
        on_delete=models.PROTECT,
        related_name='deliveries',
        null=True,
        blank=True
    )
    service_area = models.ForeignKey(
        ServiceArea,
        on_delete=models.PROTECT,
        related_name='deliveries'
    )
    base_fee = models.DecimalField(_("Base Fee"), max_digits=10, decimal_places=2)
    distance_fee = models.DecimalField(_("Distance Fee"), max_digits=10, decimal_places=2)
    additional_fees = models.JSONField(
        _("Additional Fees"),
        default=dict,
        help_text=_("JSON object containing fee type and amount"),
        blank=True
    )
    total_amount = models.DecimalField(_("Total Amount"), max_digits=10, decimal_places=2, default=0.00)

    pickup_window_start = models.DateTimeField(_("Pickup Window Start"), null=True, blank=True)
    pickup_window_end = models.DateTimeField(_("Pickup Window End"), null=True, blank=True)
    dropoff_window_start = models.DateTimeField(_("Dropoff Window Start"), null=True, blank=True)
    dropoff_window_end = models.DateTimeField(_("Dropoff Window End"), null=True, blank=True)

    estimated_delivery_duration = models.DurationField(_("Estimated Delivery Duration"), null=True, blank=True)
    estimated_pickup_time = models.DateTimeField(_("Estimated Pickup"), null=True, blank=True)
    estimated_delivery_time = models.DateTimeField(_("Estimated Delivery"), null=True, blank=True)
    actual_pickup_time = models.DateTimeField(_("Actual Pickup"), null=True, blank=True)
    actual_delivery_time = models.DateTimeField(_("Actual Delivery"), null=True, blank=True)
    pickup_address = models.ForeignKey(Address, on_delete=models.PROTECT, related_name='pickup_deliveries')
    dropoff_address = models.ForeignKey(Address, on_delete=models.PROTECT, related_name='dropoff_deliveries')
    route_info = models.JSONField(_("Route Information"), null=True, blank=True)
    distance = models.FloatField(_("Distance (km)"), validators=[MinValueValidator(0.1)], default=0.0)
    driver_rating = models.FloatField(
        _("Driver Rating"),
        null=True,
        blank=True,
        validators=[MinValueValidator(1.0), MaxValueValidator(5.0)]
    )
    driver_feedback = models.TextField(_("Driver Feedback"), blank=True)

    class Meta:
        verbose_name = _("Delivery")
        verbose_name_plural = _("Deliveries")
        indexes = [
            models.Index(fields=['estimated_delivery_time']),
            models.Index(fields=['actual_delivery_time']),
        ]

    def __str__(self):
        return f"Delivery {self.id} - {self.package.tracking_number}"
    @property
    def status(self):
        """Return the current status of the delivery."""
        return self.status_updates.first().status

    @property
    def is_delayed(self):
        """Check if delivery is delayed."""
        if self.estimated_delivery_time and not self.actual_delivery_time and datetime.now() > self.estimated_delivery_time:
            return True
        return False

    @property
    def delivery_duration(self):
        """Calculate actual delivery duration."""
        if self.actual_pickup_time and self.actual_delivery_time:
            return self.actual_delivery_time - self.actual_pickup_time
        return None


class DeliveryStatus(TimeStampedModel):
    """Model to track delivery status changes."""
    delivery = models.ForeignKey(
        Delivery,
        on_delete=models.CASCADE,
        related_name='status_updates'
    )
    status = models.CharField(_("Status"), max_length=20, choices=Package.STATUS_CHOICES)
    location = models.ForeignKey(Address, on_delete=models.PROTECT, related_name='status_updates', null=True, blank=True)
    notes = models.TextField(_("Status Notes"), blank=True)
    updated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='status_updates'
    )

    class Meta:
        verbose_name = _("Delivery Status")
        verbose_name_plural = _("Delivery Statuses")
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"Status Update: {self.delivery.package.tracking_number} - {self.status}"