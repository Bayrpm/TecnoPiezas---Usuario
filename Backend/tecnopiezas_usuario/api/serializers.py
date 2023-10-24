from rest_framework import serializers
<<<<<<< Updated upstream
from .models import Producto, Categoria, Subcategoria
=======
from .models import Producto, Categoria, Subcategoria, Locales, Bodegas, DetalleBodega
>>>>>>> Stashed changes

class ProductoSerializer(serializers.ModelSerializer):
    imagen = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = '__all__'

    def get_imagen(self, obj):
        # Construye la URL completa de la imagen
        return self.context['request'].build_absolute_uri(obj.imagen.url)

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class SubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategoria
        fields = '__all__'
<<<<<<< Updated upstream
=======

class BodegasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bodegas
        fields = '__all__'

class DetalleBodegaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleBodega
        fields = '__all__'

>>>>>>> Stashed changes
