from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, Group, Permission, PermissionsMixin
from django.utils import timezone
from rest_framework.authtoken.models import Token

# Create your models here.

class PerfilManager(BaseUserManager):
    def create_user(self, correo, nombre, contraseña=None):
        if not correo:
            raise ValueError('El correo es obligatorio')
        perfil = self.model(correo=self.normalize_email(correo), nombre=nombre)
        perfil.set_password(contraseña)
        perfil.save(using=self._db)
        return perfil

    def create_superuser(self, correo, nombre, contraseña):
        perfil = self.create_user(correo, nombre, contraseña)
        perfil.is_superuser = True
        perfil.is_staff = True
        perfil.save(using=self._db)
        return perfil

class Perfil(AbstractBaseUser):
    correo = models.EmailField(unique=True)
    nombre = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = PerfilManager()

    groups = models.ManyToManyField(Group, blank=True, related_name='perfil_groups')
    user_permissions = models.ManyToManyField(
        Permission,
        blank=True,
        related_name='perfil_user_permissions'
    )

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre']