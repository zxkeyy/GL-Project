# Generated by Django 5.1.3 on 2024-12-26 16:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('delivery', '0003_alter_delivery_driver'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='driver',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='deliveries', to='delivery.driver'),
        ),
    ]
