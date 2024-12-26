from django.contrib import admin
from django.utils.html import format_html

from .models import Delivery, DeliveryStatus, Driver, Package, ServiceArea

@admin.register(Driver)
class DriverAdmin(admin.ModelAdmin):
    list_display = ('get_driver_name', 'vehicle_type',
                   'available', 'rating', 'completion_rate')
    list_filter = ( 'available', 'vehicle_type')
    search_fields = ('user__full_name', 'user__email', 'vehicle_plate')
    
    def get_driver_name(self, obj):
        return f"{obj.user.get_full_name()}"
    get_driver_name.short_description = 'Driver'

@admin.register(ServiceArea)
class ServiceAreaAdmin(admin.ModelAdmin):
    list_display = ('name', 'base_fee', 'price_per_km', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name',)

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('tracking_number', 'sender', 'recipient_name', 'status', 'verification_code',
                   'priority', 'created_at')
    list_filter = ('status', 'priority', 'is_fragile', 'requires_signature')
    search_fields = ('tracking_number', 'recipient_name', 'recipient_phone')
    readonly_fields = ('tracking_number', 'created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('tracking_number', 'sender', 'status')
        }),
        ('Recipient Information', {
            'fields': ('recipient_name', 'recipient_phone', 'recipient_email')
        }),
        ('Package Details', {
            'fields': ('weight', 'dimensions', 'is_fragile', 'requires_signature', 
                      'insurance_amount')
        }),
        ('Delivery Information', {
            'fields': ('pickup_address', 'delivery_address', 'current_address',  'verification_code', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

class DeliveryStatusInline(admin.TabularInline):
    model = DeliveryStatus
    extra = 0
    readonly_fields = ('created_at',)

@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_tracking_number', 'driver', 'get_status', 'pickup_address', 'dropoff_address',
                   'estimated_delivery_time', 'is_delayed')
    list_filter = ('package__status', 'driver')
    search_fields = ('package__tracking_number', 'driver__user__username')
    inlines = [DeliveryStatusInline]
    readonly_fields = ('created_at', 'updated_at')

    def get_tracking_number(self, obj):
        return obj.package.tracking_number
    get_tracking_number.short_description = 'Tracking Number'

    def get_status(self, obj):
        status_colors = {
            'REQUESTED': 'blue',
            'ASSIGNED': 'purple',
            'PICKED_UP': 'orange',
            'IN_TRANSIT': 'yellow',
            'ARRIVED': 'lightgreen',
            'DELIVERED': 'green',
            'FAILED': 'red',
            'CANCELLED': 'gray'
        }
        color = status_colors.get(obj.package.status, 'black')
        return format_html(
            '<span style="color: {};">{}</span>',
            color,
            obj.package.status
        )
    get_status.short_description = 'Status'

@admin.register(DeliveryStatus)
class DeliveryStatusAdmin(admin.ModelAdmin):
    list_display = ('delivery', 'status', 'updated_by', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('delivery__package__tracking_number',)
    readonly_fields = ('created_at',)
