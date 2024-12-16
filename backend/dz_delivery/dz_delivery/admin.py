from django.contrib import admin
from .models import DeliveryGuy, Client, Vehicle, Notification

admin.site.register(DeliveryGuy)
admin.site.register(Client)
admin.site.register(Vehicle)
admin.site.register(Notification)