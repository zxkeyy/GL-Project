# Generated by Django 5.1.3 on 2024-12-25 16:57

import django.core.validators
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceArea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Area Name')),
                ('boundaries', models.JSONField(verbose_name='Area Boundaries')),
                ('base_fee', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Base Fee')),
                ('price_per_km', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Price per Kilometer')),
                ('is_active', models.BooleanField(default=True, verbose_name='Active')),
            ],
            options={
                'verbose_name': 'Service Area',
                'verbose_name_plural': 'Service Areas',
            },
        ),
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('vehicle_type', models.CharField(choices=[('BICYCLE', 'Bicycle'), ('MOTORCYCLE', 'Motorcycle'), ('CAR', 'Car'), ('VAN', 'Van')], max_length=50, verbose_name='Vehicle Type')),
                ('vehicle_plate', models.CharField(max_length=20, verbose_name='Vehicle Plate')),
                ('current_location', models.JSONField(blank=True, null=True, verbose_name='Current Location')),
                ('rating', models.FloatField(default=5.0, validators=[django.core.validators.MinValueValidator(1.0), django.core.validators.MaxValueValidator(5.0)], verbose_name='Rating')),
                ('total_deliveries', models.PositiveIntegerField(default=0, verbose_name='Total Deliveries')),
                ('successful_deliveries', models.PositiveIntegerField(default=0, verbose_name='Successful Deliveries')),
                ('available', models.BooleanField(default=False, verbose_name='Available')),
                ('last_active', models.DateTimeField(blank=True, null=True, verbose_name='Last Active')),
                ('bank_account_info', models.JSONField(blank=True, null=True, verbose_name='Bank Account Info')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='driver_profile', to=settings.AUTH_USER_MODEL)),
                ('service_areas', models.ManyToManyField(related_name='drivers', to='delivery.servicearea')),
            ],
            options={
                'verbose_name': 'Driver',
                'verbose_name_plural': 'Drivers',
            },
        ),
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('tracking_number', models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name='Tracking Number')),
                ('recipient_name', models.CharField(max_length=100, verbose_name='Recipient Name')),
                ('recipient_phone', models.CharField(max_length=15, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')], verbose_name='Recipient Phone')),
                ('recipient_email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Recipient Email')),
                ('pickup_address', models.JSONField(verbose_name='Pickup Address')),
                ('delivery_address', models.JSONField(verbose_name='Delivery Address')),
                ('status', models.CharField(choices=[('REQUESTED', 'Requested'), ('ASSIGNED', 'Assigned'), ('PICKED_UP', 'Picked Up'), ('IN_TRANSIT', 'In Transit'), ('ARRIVED', 'Arrived at Destination'), ('DELIVERED', 'Delivered'), ('FAILED', 'Failed Delivery'), ('CANCELLED', 'Cancelled')], default='REQUESTED', max_length=20, verbose_name='Status')),
                ('verification_code', models.CharField(max_length=6, verbose_name='Verification Code')),
                ('weight', models.FloatField(validators=[django.core.validators.MinValueValidator(0.1), django.core.validators.MaxValueValidator(20.0)], verbose_name='Weight (kg)')),
                ('dimensions', models.JSONField(verbose_name='Dimensions (cm)')),
                ('priority', models.CharField(choices=[('STANDARD', 'Standard'), ('EXPRESS', 'Express'), ('SAME_DAY', 'Same Day')], default='STANDARD', max_length=20, verbose_name='Priority')),
                ('is_fragile', models.BooleanField(default=False, verbose_name='Fragile')),
                ('requires_signature', models.BooleanField(default=False, verbose_name='Requires Signature')),
                ('insurance_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=10, verbose_name='Insurance Amount')),
                ('notes', models.TextField(blank=True, verbose_name='Delivery Notes')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sent_packages', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Package',
                'verbose_name_plural': 'Packages',
            },
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('base_fee', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Base Fee')),
                ('distance_fee', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Distance Fee')),
                ('additional_fees', models.JSONField(default=dict, help_text='JSON object containing fee type and amount', verbose_name='Additional Fees')),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Total Amount')),
                ('estimated_pickup_time', models.DateTimeField(verbose_name='Estimated Pickup')),
                ('estimated_delivery_time', models.DateTimeField(verbose_name='Estimated Delivery')),
                ('actual_pickup_time', models.DateTimeField(blank=True, null=True, verbose_name='Actual Pickup')),
                ('actual_delivery_time', models.DateTimeField(blank=True, null=True, verbose_name='Actual Delivery')),
                ('route_info', models.JSONField(blank=True, null=True, verbose_name='Route Information')),
                ('distance', models.FloatField(validators=[django.core.validators.MinValueValidator(0.1)], verbose_name='Distance (km)')),
                ('driver_rating', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)], verbose_name='Driver Rating')),
                ('customer_rating', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)], verbose_name='Customer Rating')),
                ('customer_feedback', models.TextField(blank=True, verbose_name='Customer Feedback')),
                ('driver_feedback', models.TextField(blank=True, verbose_name='Driver Feedback')),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='deliveries', to='delivery.driver')),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='deliveries', to='delivery.package')),
                ('service_area', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='deliveries', to='delivery.servicearea')),
            ],
            options={
                'verbose_name': 'Delivery',
                'verbose_name_plural': 'Deliveries',
            },
        ),
        migrations.CreateModel(
            name='DeliveryStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('status', models.CharField(choices=[('REQUESTED', 'Requested'), ('ASSIGNED', 'Assigned'), ('PICKED_UP', 'Picked Up'), ('IN_TRANSIT', 'In Transit'), ('ARRIVED', 'Arrived at Destination'), ('DELIVERED', 'Delivered'), ('FAILED', 'Failed Delivery'), ('CANCELLED', 'Cancelled')], max_length=20, verbose_name='Status')),
                ('location', models.JSONField(blank=True, null=True, verbose_name='Location')),
                ('notes', models.TextField(blank=True, verbose_name='Status Notes')),
                ('delivery', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='status_updates', to='delivery.delivery')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='status_updates', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Delivery Status',
                'verbose_name_plural': 'Delivery Statuses',
                'ordering': ['-created_at'],
                'indexes': [models.Index(fields=['-created_at'], name='delivery_de_created_93f724_idx'), models.Index(fields=['status'], name='delivery_de_status_cb1e3a_idx')],
            },
        ),
        migrations.AddIndex(
            model_name='package',
            index=models.Index(fields=['tracking_number'], name='delivery_pa_trackin_91501d_idx'),
        ),
        migrations.AddIndex(
            model_name='package',
            index=models.Index(fields=['status'], name='delivery_pa_status_08e762_idx'),
        ),
        migrations.AddIndex(
            model_name='package',
            index=models.Index(fields=['created_at'], name='delivery_pa_created_b0c70b_idx'),
        ),
        migrations.AddIndex(
            model_name='driver',
            index=models.Index(fields=['available'], name='delivery_dr_availab_1518f9_idx'),
        ),
        migrations.AddIndex(
            model_name='driver',
            index=models.Index(fields=['rating'], name='delivery_dr_rating_518dbf_idx'),
        ),
        migrations.AddIndex(
            model_name='delivery',
            index=models.Index(fields=['estimated_delivery_time'], name='delivery_de_estimat_656a3c_idx'),
        ),
        migrations.AddIndex(
            model_name='delivery',
            index=models.Index(fields=['actual_delivery_time'], name='delivery_de_actual__5865a0_idx'),
        ),
    ]
