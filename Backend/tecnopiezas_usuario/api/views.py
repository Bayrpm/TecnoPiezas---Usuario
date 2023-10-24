import json
from typing import Any
from django.http import JsonResponse
from django.views import View
from .models import *
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404

from .serializers import ProductoSerializer, LocalesSerializer, CategoriaSerializer, SubcategoriaSerializer

from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login

from rest_framework.authtoken.models import Token

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny



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

@api_view(['POST'])
@permission_classes([AllowAny])
def custom_obtain_auth_token(request):
    username = request.data.get('username')
    password = request.data.get('password')

    print(f"Username: {username}, Password: {password}")

    if username is None or password is None:
        return Response({'error': 'Debes proporcionar un nombre de usuario y una contraseña'}, status=status.HTTP_400_BAD_REQUEST)

    # Autentica al usuario
    user = authenticate(username=username, password=password)

    if user is not None:
        if user.is_active:
            # Asigna un token al usuario si no tiene uno
            token, created = Token.objects.get_or_create(user=user)

            # Obtiene el rol del usuario (reemplaza 'tipo_administrador' con el nombre real del campo)
            try:
                role = Administrador.objects.get(username=username).tipo_administrador
            except Administrador.DoesNotExist:
                return Response({'error': 'No se encontró el usuario'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'token': token.key, 'role': role}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'La cuenta del usuario no está activa'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        if user.is_active:
            token, created = Token.objects.get_or_create(user=user)
            user.token = token.key
            user.save()

            role = user.tipo_administrador
            return Response({'token': token.key, 'role': role}, status=200)
        else:
            return Response({'detail': 'La cuenta del usuario no está activa.'}, status=400)
    else:
        return Response({'detail': 'Credenciales incorrectas o usuario inexistente.'}, status=400)