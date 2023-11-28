from django.http import JsonResponse
from .models import *

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse
from .serializers import *


from rest_framework import generics

from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_POST


# Vista basada en una clase



class ListaProductos(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    

class ListaLocales(generics.ListCreateAPIView):
    queryset = Locales.objects.all()
    serializer_class = LocalesSerializer

class ListaCategorias(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ListaSubCategorias(generics.ListAPIView):
    queryset = Subcategoria.objects.all()
    serializer_class = SubcategoriaSerializer

class ListaSubcategoriasPorCategoria(APIView):
    def get(self, request, categoria_id):
        subcategorias = Subcategoria.objects.filter(categoria_id=categoria_id)
        serializer = SubcategoriaSerializer(subcategorias, many=True)
        return Response(serializer.data)

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

class VistaProductoDAE(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    lookup_field = 'producto_id'

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

# views.py
from django.http import JsonResponse
import json

@require_POST
def crear_guia_despacho(request):
    try:
        data = request.body.decode('utf-8')
        json_data = json.loads(data)

        id_locales_str = json_data.get('id_locales')
        productos_data = json_data.get('productos', [])

        if id_locales_str is None:
            return JsonResponse({'error': 'The "id_locales" field is required in the JSON data.'}, status=400)

        id_locales = int(id_locales_str)
        print(f"Received id_locales: {id_locales}")

        local = Locales.objects.get(pk=id_locales)

        # Resto de tu código...

        return JsonResponse({'message': 'Guía de despacho creada correctamente'}, status=200)

    except Locales.DoesNotExist:
        return JsonResponse({'error': 'Local not found with the given ID'}, status=404)

    except ValueError:
        return JsonResponse({'error': 'Invalid value for "id_locales". Must be a valid integer.'}, status=400)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)