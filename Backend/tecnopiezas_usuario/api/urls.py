from django.urls import path
from .views import *
from . import views


urlpatterns = [
    path('productos/', ListaProductos.as_view(), name='lista-productos'),
    path('locales/', ListaLocales.as_view(), name='listar-locales'),  # Ruta para listar y crear locales
    path('locales/<int:id_locales>/', VistaLocalesDAE.as_view(), name='locales-dae'),  # Ruta para detalles, actualización y eliminación de un local
    path('categorias/', ListaCategorias.as_view(), name='lista-categorias'),
    path('subcategorias/', ListaSubCategorias.as_view(), name='lista-subcategorias'),
    path('subcategorias_por_categoria/<int:categoria_id>', ListaSubcategoriasPorCategoria.as_view(), name='subcategorias-por-categoria'),
    path('productos_filtrados/', ListaProductosFiltrados.as_view(), name='productos-filtrados'),
    path('productos/filtro/', ListaProductosFiltrados.as_view(), name='lista_productos_filtrados'),
    path('productos/<int:producto_id>/', VistaProductoDAE.as_view(), name='vista-producto-dae'),

    path('login/', login, name='login'),
  
    path('detallebodega/', DetalleBodega.as_view(), name='detalle_bodega'),
    #path('detallebodega/<int:id_detalle_bodega>/', DetalleBodegaDAE.as_view(), name='detalle-bodega-dae')

    #path('login/', custom_obtain_auth_token, name='login'),

]