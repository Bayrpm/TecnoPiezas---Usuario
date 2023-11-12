from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, Group, Permission, PermissionsMixin

# Create your models here.

class PerfilManager(BaseUserManager):
    def create_user(self, correo, password=None, **extra_fields):
        if not correo:
            raise ValueError('El correo es obligatorio.')
        user = self.model(correo=self.normalize_email(correo), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, correo, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('tipo_usuario', 'gerente')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser debe ser is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser debe ser is_superuser=True.')

        return self.create_user(correo, password, **extra_fields)

class Perfil(AbstractBaseUser, PermissionsMixin):
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

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = PerfilManager()

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre']

    def __str__(self):
      return self.nombre + self.correo