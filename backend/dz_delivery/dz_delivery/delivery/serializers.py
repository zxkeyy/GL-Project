from rest_framework import serializers
from ..models import DeliveryGuy, Client, DeliveryTripOffer, Command

class DeliveryGuySerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryGuy
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class DeliveryTripOfferSerializer(serializers.ModelSerializer):
    FK_delivery_guy = DeliveryGuySerializer()

    class Meta:
        model = DeliveryTripOffer
        fields = '__all__'

class CommandSerializer(serializers.ModelSerializer):
    FK_client = ClientSerializer()
    FK_delivery_trip_offer = DeliveryTripOfferSerializer()

    class Meta:
        model = Command
        fields = '__all__'
