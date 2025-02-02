# Generated by Django 5.1.3 on 2024-12-21 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_documenttype_options_remove_documenttype_order'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='documenttype',
            options={'ordering': ['-is_courier_required', '-is_client_required', 'name']},
        ),
        migrations.RenameField(
            model_name='user',
            old_name='is_verified',
            new_name='is_courier_verified',
        ),
        migrations.RemoveField(
            model_name='documenttype',
            name='is_required',
        ),
        migrations.AddField(
            model_name='documenttype',
            name='is_client_required',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='documenttype',
            name='is_courier_required',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='is_client_verified',
            field=models.BooleanField(default=False),
        ),
    ]
