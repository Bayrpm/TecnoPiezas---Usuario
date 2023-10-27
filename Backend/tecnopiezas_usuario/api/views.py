import json
from typing import Any
from django.http import JsonResponse
from django.views import View
from .models import DetalleBodega
from .models import *
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404

from .serializers import ProductoSerializer, LocalesSerializer, CategoriaSerializer, SubcategoriaSerializer, DetalleBodegaSerializer, BodegasSerializer

from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login

from rest_framework.authtoken.models import Token

from rest_framework import generics

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

import logging

logger = logging.getLogger(__name__)


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

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def custom_obtain_auth_token(request):
#    username = request.data.get('username')
#    password = request.data.get('password')
#
#    print(f"Username: {username}, Password: {password}")
#
#    if username is None or password is None:
#        return Response({'error': 'Debes proporcionar un nombre de usuario y una contraseña'}, status=status.HTTP_400_BAD_REQUEST)
#
#    # Autentica al usuario
#    user = authenticate(username=username, password=password)
#
#    if user is not None:
#        if user.is_active:
#            # Asigna un token al usuario si no tiene uno
#            token, created = Token.objects.get_or_create(user=user)
#
#            # Obtiene el rol del usuario (reemplaza 'tipo_administrador' con el nombre real del campo)
#            try:
#                role = Administrador.objects.get(username=username).tipo_administrador
#            except Administrador.DoesNotExist:
#                return Response({'error': 'No se encontró el usuario'}, status=status.HTTP_400_BAD_REQUEST)
#
#            return Response({'token': token.key, 'role': role}, status=status.HTTP_200_OK)
#        else:
#            return Response({'error': 'La cuenta del usuario no está activa'}, status=status.HTTP_400_BAD_REQUEST)
#    else:
#        return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    logger.debug(f"Username received: {username}")
    logger.debug(f"Password received: {password}")

    user = authenticate(request, username=username, password=password)

    if user is not None:
        if user.is_active:
            token, _ = Token.objects.get_or_create(user=user)  # Ignoramos la variable 'created'
            logger.debug(f"Token generated: {token.key}")

            role = user.tipo_administrador
            logger.debug(f"Role: {role}")

            return Response({'token': token.key, 'role': role}, status=status.HTTP_200_OK)
        else:
            logger.error("La cuenta del usuario no está activa.")
            return Response({'detail': 'La cuenta del usuario no está activa.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        logger.error("Credenciales incorrectas o usuario inexistente.")
        return Response({'detail': 'Credenciales incorrectas o usuario inexistente.'}, status=status.HTTP_400_BAD_REQUEST)

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