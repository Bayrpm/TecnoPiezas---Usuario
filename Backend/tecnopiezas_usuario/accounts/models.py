from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, Group, Permission, PermissionsMixin

# Create your models here.

class PerfilManager(BaseUserManager):
    def create_user(self, correo, password=None, **extra_fields):
        if not correo:
            raise ValueError('El correo es obligatorio.')
        
        tipo_usuario = extra_fields.get('tipo_usuario', 'usuario')

        user = self.model(correo=self.normalize_email(correo), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        if tipo_usuario == 'gerente':
            group_name = "Gerentes"
        elif tipo_usuario == 'administrador':
            group_name = "Administradores"
        else:
            group_name = "Usuarios"  # En caso de agregar un grupo para usuarios regulares

        group, _ = Group.objects.get_or_create(name=group_name)
        user.groups.add(group)

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

class administradores(models.Model):

    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    perfil = models.OneToOneField(Perfil, on_delete=models.CASCADE)
    contraseña = models.CharField(max_length=128)

    def __str__(self):
        return self.nombre + self.apellido