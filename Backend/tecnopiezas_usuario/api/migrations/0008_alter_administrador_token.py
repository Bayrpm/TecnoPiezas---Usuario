# Generated by Django 4.2.6 on 2023-10-24 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_administrador_groups_administrador_is_active_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='administrador',
            name='token',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
