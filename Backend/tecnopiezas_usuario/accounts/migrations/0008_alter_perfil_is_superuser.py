# Generated by Django 4.2.7 on 2023-11-14 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_perfil_is_superuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perfil',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
        ),
    ]
