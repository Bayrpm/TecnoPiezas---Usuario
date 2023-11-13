from rest_framework import serializers
from .models import Perfil, administradores

class PerfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfil
        fields = ('id', 'correo', 'nombre', 'last_login')

class AdministradoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = administradores
        fields = '__all__'