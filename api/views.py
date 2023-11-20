from .models import *

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response


from .serializers import *


from rest_framework import generics

from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from rest_framework.parsers import MultiPartParser, FormParser


# Vista basada en una clase

############################################# Productos #####################################################

class SubirImagenProducto(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, producto_id):
        producto = Producto.objects.get(producto_id=producto_id)
        producto.imagen = request.data['imagen']
        producto.save()
        return Response({'message': 'Imagen cargada con éxito'})

class ListaProductos(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    

class VistaProductoDAE(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = 'producto_id'


############################################# Categorias #####################################################

class ListaCategorias(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    

class VistaCategoriasDAE(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()  
    serializer_class = CategoriaSerializer  
    lookup_field = 'id_categoria'
    

############################################# SubCategorias #####################################################

class ListaSubCategorias(generics.ListCreateAPIView):
    queryset = Subcategoria.objects.all()
    serializer_class = SubcategoriaSerializer

class VistaSubCategoriasDAE(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()  
    serializer_class = CategoriaSerializer  
    lookup_field = 'subcategoria_id'

class ListaSubcategoriasPorCategoria(APIView):
    def get(self, request, categoria_id):
        subcategorias = Subcategoria.objects.filter(categoria_id=categoria_id)
        serializer = SubcategoriaSerializer(subcategorias, many=True)
        return Response(serializer.data)

############################################# productos filtrados #####################################################

class ListaProductosFiltrados(APIView):
    def get(self, request):
        busqueda = request.query_params.get('busqueda', '')
        categoria = request.query_params.get('categoria', None)
        subcategoria = request.query_params.get('subcategoria', None)

        # Filtra los productos según los parámetros de búsqueda, categoría y subcategoría
        productos = Producto.objects.filter(nombre__icontains=busqueda)

        if categoria:
            productos = productos.filter(categoria=categoria)
        if subcategoria:
            productos = productos.filter(subcategoria=subcategoria)

        serializer = ProductoSerializer(productos, many=True, context={'request': request})
        
        return Response({'productos': serializer.data})

# el VistaProductoDAE procesa los metodos GET, PUT y DELETE, osea que esta vista se encargara de recuperar,
# actualizar o eliminar algun producto.
# Las operaciones se implementan junto al "RetrieveUpdateDestroyAPIView" o DRF, asi nos ahorramos tiempo en el CRUD
# Creador - Bayron A.

############################################# Locales #####################################################

class ListaLocales(generics.ListCreateAPIView):
    queryset = Locales.objects.all()
    serializer_class = LocalesSerializer

class VistaLocalesDAE(generics.RetrieveUpdateDestroyAPIView):
    queryset = Locales.objects.all()
    serializer_class = LocalesSerializer
    lookup_field = 'id_locales'



############################################# Bodega #####################################################
class ListaBodegas(generics.ListCreateAPIView):
    queryset = Bodegas.objects.all()
    serializer_class = BodegasSerializer

class VistaBodegasDAE(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bodegas.objects.all()
    serializer_class = BodegasSerializer
    lookup_field = 'id_bodega'

    #def delete(self, request, *args, **kwargs):
        #instance = self.get_object()

        ## Realizar acciones adicionales antes de eliminar la bodega si es necesario
        ## Por ejemplo, puedes verificar si hay productos en la bodega antes de eliminarla
        #if instance.productos.count() > 0:
        ## Cambiamos el mensaje para indicar que no se puede eliminar la bodega si hay productos asociados
            #return Response({'detail': 'No se puede eliminar la bodega porque tiene productos asociados.'},
                    #status=status.HTTP_400_BAD_REQUEST)

        ## Llamada al método 'destroy' para eliminar la bodega
        #self.perform_destroy(instance)
        #return Response(status=status.HTTP_204_NO_CONTENT)

############################################# Fin Bodega #####################################################

############################################# Detalle Bodega #####################################################

class DetalleBodega(APIView):
    def get(self, request, id_detalle_bodega):
        try:
            detalle_bodega = DetalleBodega.objects.get(id=id_detalle_bodega)
            detalle = {
                'id_detalle_bodega': detalle_bodega.id,
                'id_producto': detalle_bodega.producto.id,  # ID del producto relacionado
                'stock': detalle_bodega.stock_producto  # Stock del producto en el detalle de la bodega
            }
            return Response(detalle)
        except DetalleBodega.DoesNotExist:
            return Response({'detail': 'El detalle de bodega no existe.'}, status=404)
        
"""class DetalleBodegaDAE(generics.RetrieveUpdateDestroyAPIView):
    queryset = DetalleBodega.objects.all()
    serializer_class = DetalleBodegaSerializer
    lookup_field = 'id_detalle_bodega'"""

############################################# Fin Detalle Bodega #####################################################

############################################# Gerente compra #####################################################



############################################# Fin Gerente compra #####################################################


