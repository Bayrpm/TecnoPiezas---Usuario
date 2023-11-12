from django.db import models

from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.

class Perfil(AbstractUser):
    correo = models.EmailField(unique=True)
    nombre = models.CharField(max_length=35)

    groups = models.ManyToManyField(Group, blank=True, related_name='perfil_groups')
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name='perfil_user_permissions')

    TIPO_USUARIO_CHOICES = [
        ('usuario', 'Usuario'),
        ('administrador', 'Administrador'),
        ('gerente', 'Gerente'),
    ]
    tipo_usuario = models.CharField(
        max_length=15,
        choices=TIPO_USUARIO_CHOICES,
        default='usuario',  # Puedes cambiar el valor predeterminado
    )

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre']

    def __str__(self):
      return self.nombre