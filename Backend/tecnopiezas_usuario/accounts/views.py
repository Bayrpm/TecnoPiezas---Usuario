from django.shortcuts import render

from .models import Perfil
from .serializers import PerfilSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from django.http import Http404

from rest_framework.authtoken.models import Token

# Create your views here.

class Registro(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = PerfilSerializer(data=request.data)
        if serializer.is_valid():
            perfil = serializer.save()
            perfil.set_password(request.data['password'])
            perfil.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InicioSesion(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        correo = request.data.get('correo')
        password = request.data.get('password')
        usuario = authenticate(request, correo=correo, password=password)

        if usuario is not None:
            login(request, usuario)
            token, created = Token.objects.get_or_create(user=usuario)
            serializer = PerfilSerializer(usuario)
            response_data = {
                'user_data': serializer.data,
                'token': token.key
            }
            return Response(response_data)
        else:
            return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_400_BAD_REQUEST)
