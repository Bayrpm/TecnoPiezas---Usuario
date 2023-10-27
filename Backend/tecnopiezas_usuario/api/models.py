from django.db import models
from django.core.validators import MaxValueValidator

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import Group, Permission

# Modelo de Categoria

class Categoria(models.Model):
    categoria_id = models.AutoField(primary_key=True)  # Campo de clave primaria autoincremental
    nombre_categoria = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre_categoria

# Modelo de subcategoría

class Subcategoria(models.Model):
    subcategoria_id = models.AutoField(primary_key=True)  # Campo de clave primaria autoincremental
    nombre_subcategoria = models.CharField(max_length=255)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)  # Clave externa para la categoría

    def __str__(self):
        return self.nombre_subcategoria

# Modelo de producto

class Producto(models.Model):
    producto_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    precio = models.PositiveIntegerField()
    stock = models.PositiveIntegerField()
    descripcion = models.TextField(blank=True, null=True)
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, default=1)
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.CASCADE, default=1)
    
    def __str__(self):
        return self.nombre

    
class Locales(models.Model):
    id_locales = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=80)
    descripcion = models.TextField(blank=True, null=True)
    correo = models.CharField(max_length=80)
    telefono = models.CharField(max_length=19)

    def __str__(self):
      return self.direccion
 
class Bodegas(models.Model):
    id_bodega = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    capacidad = models.PositiveIntegerField()  # Capacidad de la bodega en productos

    def __str__(self):
        return self.direccion
    
class DetalleBodega(models.Model):
    id_detalle_bodega = models.AutoField(primary_key=True)
    bodega = models.ForeignKey(Bodegas, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField(default=0)  # Campo para el stock del producto

    def __str__(self):
        return f"Detalle de {self.bodega.nombre} - Producto: {self.producto.nombre}"
    
class AdministradorManager(BaseUserManager):
    def create_user(self, username, correo, password=None, **extra_fields):
        if not correo:
            raise ValueError('El Correo debe ser establecido')
        email = self.normalize_email(correo)
        user = self.model(username=username, correo=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, correo, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', False)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, correo, password, **extra_fields)

class Administrador(AbstractBaseUser, PermissionsMixin):
    admin_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30, unique=True)
    correo = models.EmailField(unique=True)
    fecha_creacion = models.DateField(auto_now_add=True)
    ADMINISTRADOR_CHOICES = [
        ('administrador', 'Administrador'),
        ('gerente', 'Gerente'),
    ]
    tipo_administrador = models.CharField(max_length=13, choices=ADMINISTRADOR_CHOICES)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = AdministradorManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['correo', 'tipo_administrador']

    groups = models.ManyToManyField(Group, related_name='administradores', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='administradores', blank=True)

    def __str__(self):
        return f'{self.username} - {self.tipo_administrador}'

class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30, unique=True, null=False)
    password = models.CharField(max_length=30)
    correo = models.EmailField(unique=True, null=False)
    fecha_creacion = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Formatea la fecha de creación como "día, mes y año" (DD/MM/YYYY)
        self.fecha_creacion = self.fecha_creacion.strftime('%d/%m/%Y')
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

class Cliente(models.Model):
    cliente_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=50)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    GENERO_CHOICES = [
        ('masculino', 'Masculino'),
        ('femenino', 'Femenino'),
        ('otro', 'Otro'),
    ]
    genero = models.CharField(max_length=10, choices=GENERO_CHOICES, null=False)
    direccion = models.TextField(null=False)
    telefono = models.CharField(max_length=17, null=False)

class ClientePerfil(models.Model):
    perfil_id = models.AutoField(primary_key=True)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, unique=True)
    cliente = models.OneToOneField(Cliente, on_delete=models.CASCADE, unique=True) ## De esta forma nos aseguramos que un cliente solamente tenga 1 usuario.


    