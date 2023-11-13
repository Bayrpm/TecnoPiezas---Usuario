from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Producto)
admin.site.register(Locales)
admin.site.register(Subcategoria)
admin.site.register(Categoria)
admin.site.register(Bodegas)
admin.site.register(DetalleBodega)