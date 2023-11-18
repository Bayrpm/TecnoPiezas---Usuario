from django.urls import path
from .views import Registro, InicioSesion, InicioSesionPrivado, AgregarAdministrador, CerrarSesion

urlpatterns = [
    path('registro/', Registro.as_view(), name='registro'),
    path('inicio-sesion/', InicioSesion.as_view(), name='inicio-sesion'),
    path('inicio-sesion-privado/', InicioSesionPrivado.as_view(), name='inicio-sesion-privado'),
    path('cerrar-sesion/', CerrarSesion.as_view(), name='cerrar-sesion'),
    path('agregar-admin/', AgregarAdministrador.as_view(), name='agregar-admin'),
]