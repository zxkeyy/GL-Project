# Generated by Django 5.1.3 on 2025-01-24 18:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('delivery', '0009_delivery_dropoff_address_delivery_pickup_address_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='address',
            options={'verbose_name': 'Address', 'verbose_name_plural': 'Addresses'},
        ),
    ]
