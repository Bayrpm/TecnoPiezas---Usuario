from django.db import models

from django.contrib.auth.models import AbstractUser, Permission, Group

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
    
