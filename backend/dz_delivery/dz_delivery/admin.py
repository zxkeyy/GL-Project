from django.contrib import admin
from .models import DeliveryGuy, Client, Vehicle, Notification,Command,Delivery_trip_offer,Incident_report,Route_allocation

admin.site.register(DeliveryGuy)
admin.site.register(Client)
admin.site.register(Vehicle)
admin.site.register(Notification)
admin.site.register(Command)
admin.site.register(Delivery_trip_offer)
admin.site.register(Incident_report)
admin.site.register(Route_allocation)