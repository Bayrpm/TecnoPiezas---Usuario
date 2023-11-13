# Generated by Django 4.2.6 on 2023-11-12 01:59

import django.contrib.auth.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='perfil',
            name='tipo_usuario',
            field=models.CharField(choices=[('usuario', 'Usuario'), ('administrador', 'Administrador'), ('gerente', 'Gerente')], default='usuario', max_length=15),
        ),
    ]
