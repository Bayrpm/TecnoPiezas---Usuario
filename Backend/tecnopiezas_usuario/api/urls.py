from django.urls import path
from .views import *
from . import views


urlpatterns = [
    path('productos/', ListaProductos.as_view(), name='lista-productos'),
    path('locales/', ListaLocales.as_view(), name='listar-locales'),  # Ruta para listar y crear locales
    path('locales/<int:id_locales>/', VistaLocalesDAE.as_view(), name='locales-dae'),  # Ruta para detalles, actualización y eliminación de un local
    path('categorias/', ListaCategorias.as_view(), name='lista-categorias'),
    path('categorias/<int:id_bodega>/', VistaCategoriasDAE.as_view(), name='categorias-dae'),
    path('sub-categorias/', ListaSubCategorias.as_view(), name='lista-sub-categorias'),
    path('subcategorias_por_categoria/<int:categoria_id>', ListaSubcategoriasPorCategoria.as_view(), name='subcategorias-por-categoria'),
    path('sub-categorias/<int:id_bodega>/', VistaSubCategoriasDAE.as_view(), name='sub-categorias-dae'),
    path('productos_filtrados/', ListaProductosFiltrados.as_view(), name='productos-filtrados'),
    path('productos/filtro/', ListaProductosFiltrados.as_view(), name='lista_productos_filtrados'),
    path('productos/<int:producto_id>/', VistaProductoDAE.as_view(), name='productos-dae'),
    path('bodegas/', ListaBodegas.as_view(), name='vista-bodegas'),
    path('bodegas/<int:id_bodega>/', VistaBodegasDAE.as_view(), name='bodegas-dae'),
    path('productos/upload-image/<int:producto_id>/', SubirImagenProducto.as_view(), name='subir-imagen-producto'),  # Nueva URL para cargar imágenes
  
    path('detallebodega/', DetalleBodega.as_view(), name='detalle_bodega'),
    #path('detallebodega/<int:id_detalle_bodega>/', DetalleBodegaDAE.as_view(), name='detalle-bodega-dae')



]