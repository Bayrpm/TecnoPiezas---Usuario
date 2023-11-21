from django.shortcuts import render

from .models import Perfil, administradores
from .serializers import PerfilSerializer, AdministradoresSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, update_session_auth_hash
from django.http import Http404

from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from rest_framework.authentication import TokenAuthentication

from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError, transaction
import string
import random

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

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

        if usuario is not None and check_password(password, usuario.password):
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

class InicioSesionPrivado(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        correo = request.data.get('correo')
        password = request.data.get('password')
        usuario = authenticate(request, correo=correo, password=password)

        if usuario is not None and check_password(password, usuario.password):
            if usuario.tipo_usuario in ['gerente', 'administrador']:
                login(request, usuario)
                token, created = Token.objects.get_or_create(user=usuario)
                serializer = PerfilSerializer(usuario)
                response_data = {
                    'user_data': serializer.data,
                    'token': token.key
                }
                return Response(response_data)
            else:
                return Response({'error': 'Acceso denegado: No eres un gerente o administrador'}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'error': 'Credenciales incorrectas'}, status=status.HTTP_400_BAD_REQUEST)
    
class CerrarSesion(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        try:
            # Eliminar el token del usuario actual
            request.user.auth_token.delete()
            return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": "Error logging out."}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@login_required
@require_POST
def verificar_contrasena_actual(request):
    contrasena_actual = request.POST.get('current_password')

    if request.user.check_password(contrasena_actual):
        return JsonResponse({'message': 'Contraseña actual correcta'})
    else:
        return JsonResponse({'error': 'Contraseña actual incorrecta'}, status=400)

@csrf_exempt
@login_required
@require_POST
def cambiar_contrasena(request):
    correo = request.POST.get('correo')
    contrasena_nueva = request.POST.get('new_password')
    confirmar_contrasena = request.POST.get('confirm_password')

    if contrasena_nueva != confirmar_contrasena:
        return JsonResponse({'error': 'Las contraseñas no coinciden'}, status=400)

    user = User.objects.get(correo=correo)

    # Actualizar la contraseña
    user.set_password(contrasena_nueva)
    user.save()

    # Actualizar la sesión del usuario con la nueva contraseña
    update_session_auth_hash(request, user)

    return JsonResponse({'message': 'Contraseña cambiada exitosamente'})

class AgregarAdministrador(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        nombre = request.data.get('nombre')
        apellido = request.data.get('apellido')

        if not nombre or not apellido:
            return Response({'error': 'El nombre y apellido son obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

        if len(nombre) < 3 or len(apellido) < 3:
            return Response({'error': 'El nombre y apellido deben tener al menos 3 caracteres'}, status=status.HTTP_400_BAD_REQUEST)

        def generar_contrasena():
            digits = string.digits
            return ''.join(random.choice(digits) for _ in range(4))

        contrasena = f"{nombre[:3].lower()}{apellido[:3].lower()}{generar_contrasena()}"

        try:
            with transaction.atomic():
                perfil = Perfil.objects.create(
                    correo=f"{nombre[:3].lower()}.{apellido.lower()}@Administracion.com",
                    nombre=f"{nombre} {apellido} [ADMIN]",
                    is_staff=True
                )

                administrador = administradores.objects.create(
                    nombre=nombre,
                    apellido=apellido,
                    perfil=perfil,
                    contraseña=contrasena
                )

                serializer = AdministradoresSerializer(administrador)

            return Response({'message': 'Administrador creado con éxito', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        except IntegrityError as e:
            return Response({'error': 'No se pudo crear el administrador debido a una violación de integridad en la base de datos', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': 'No se pudo crear el administrador', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)