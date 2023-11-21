from rest_framework import serializers

from django.contrib.auth import authenticate

from .models import *

class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = '__all__'

    def get_imagen(self, obj):
        # Construye la URL completa de la imagen
        return self.context['request'].build_absolute_uri(obj.imagen.url)

class LocalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locales
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class SubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategoria
        fields = '__all__'

class BodegasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bodegas
        fields = '__all__'

class DetalleBodegaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleBodega
        fields = '__all__'
