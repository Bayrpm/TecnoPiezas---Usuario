from django.contrib import admin
from .models import Producto, Locales,Categoria, Subcategoria

# Register your models here.

admin.site.register(Producto)
admin.site.register(Locales)
admin.site.register(Subcategoria)
admin.site.register(Categoria)
