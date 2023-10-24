from django.urls import path
from .views import *


urlpatterns = [
    path('productos/', ListaProductos.as_view(), name='lista-productos'),
    path('categorias/', ListaCategorias.as_view(), name='lista-categorias'),
    path('subcategorias/', ListaSubCategorias.as_view(), name='lista-subcategorias'),
    path('subcategorias_por_categoria/<int:categoria_id>', ListaSubcategoriasPorCategoria.as_view(), name='subcategorias-por-categoria'),
    path('productos_filtrados/', ListaProductosFiltrados.as_view(), name='productos-filtrados'),
    path('productos/filtro/', ListaProductosFiltrados.as_view(), name='lista_productos_filtrados'),
<<<<<<< Updated upstream
    path('productos/<int:producto_id>/', VistaProductoDAE.as_view(), name='vista-producto-dae')
=======
    path('productos/<int:producto_id>/', VistaProductoDAE.as_view(), name='vista-producto-dae'),

    path('login/', custom_obtain_auth_token, name='login'),

    path('detallebodega/', DetalleBodega.as_view(), name='detalle_bodega'),
    #path('detallebodega/<int:id_detalle_bodega>/', DetalleBodegaDAE.as_view(), name='detalle-bodega-dae')
>>>>>>> Stashed changes
]