from django.urls import path
from .views import Registro, InicioSesion

urlpatterns = [
    path('registro/', Registro.as_view(), name='registro'),
    path('inicio-sesion/', InicioSesion.as_view(), name='inicio-sesion'),
]