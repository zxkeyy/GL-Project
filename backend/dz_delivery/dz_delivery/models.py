from django.db import models

class DeliveryGuy(models.Model):
    id_livreur = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=30)
    rating = models.CharField(max_length=30)
    licence_number = models.CharField(max_length=50)
    availability = models.BooleanField(default=True)
    is_freelancer = models.BooleanField(default=False)
    profile_pic = models.ImageField(upload_to='delivery_guys/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.licence_number}"

class Client(models.Model):
    id_client = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=20)
    password = models.CharField(max_length=30)
    email = models.EmailField(max_length=30)
    profile_pic = models.ImageField(upload_to='clients/', null=True, blank=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

class Vehicle(models.Model):
    id_vehicle = models.AutoField(primary_key=True)
    matricule = models.CharField(max_length=30)
    capacity = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    FK_id_livreur = models.ForeignKey(DeliveryGuy, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.matricule} - {self.category}"

class Notification(models.Model):
    id_notification = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=100)
    status = models.CharField(max_length=30)
    expiry = models.DateTimeField()
    FK_delivery_trip_offer = models.IntegerField()

    def __str__(self):
        return f"{self.message} - {self.status}"