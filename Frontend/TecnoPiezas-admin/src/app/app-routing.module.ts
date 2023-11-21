import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: 'locales-home',
    loadChildren: () => import('./Locales/locales-home/locales-home.module').then(m => m.LocalesHomePageModule)
  },
  {
    path: 'locales-agregar',
    loadChildren: () => import('./Locales/locales-agregar/locales-agregar.module').then(m => m.LocalesAgregarPageModule)
  },
  {
    path: 'locales-leer',
    loadChildren: () => import('./Locales/locales-leer/locales-leer.module').then(m => m.LocalesLeerPageModule)
  },
  {
    path: 'locales-leer/:id_locales',
    loadChildren: () => import('./Locales/locales-leer/locales-leer.module').then(m => m.LocalesLeerPageModule)
  },
  {
    path: 'locales-actualizar/:id_locales',
    loadChildren: () => import('./Locales/locales-actualizar/locales-actualizar.module').then(m => m.LocalesActualizarPageModule)
  },
  {
    path: 'bodegas-home',
    loadChildren: () => import('./Bodegas/bodegas-home/bodegas-home.module').then( m => m.BodegasHomePageModule)
  },
  {
    path: 'bodegas-actualizar',
    loadChildren: () => import('./Bodegas/bodegas-actualizar/bodegas-actualizar.module').then( m => m.BodegasActualizarPageModule)
  },
  {
    path: 'bodegas-agregar',
    loadChildren: () => import('./Bodegas/bodegas-agregar/bodegas-agregar.module').then( m => m.BodegasAgregarPageModule)
  },
  {
    path: 'bodegas-home',
    loadChildren: () => import('./Bodegas/bodegas-home/bodegas-home.module').then( m => m.BodegasHomePageModule)
  },
  {
    path: 'bodegas-leer',
    loadChildren: () => import('./Bodegas/bodegas-leer/bodegas-leer.module').then( m => m.BodegasLeerPageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./accounts/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'agregar-admin',
    loadChildren: () => import('./accounts/administracion/agregar-admin/agregar-admin.module').then( m => m.AgregarAdminPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  
  {
    path: 'categorias-home',
    loadChildren: () => import('./Categorias/categorias-home/categorias-home.module').then( m => m.CategoriasHomePageModule)
  },
  {
    path: 'categorias-actualizar/:id_categoria', 
    loadChildren: () => import('./Categorias/categorias-actualizar/categorias-actualizar.module').then( m => m.CategoriasActualizarPageModule)
  },
  {
    path: 'categorias-agregar', 
    loadChildren: () => import('./Categorias/categorias-agregar/categorias-agregar.module').then( m => m.CategoriasAgregarPageModule)
  },
  {
    path: 'categorias-home', 
    loadChildren: () => import('./Categorias/categorias-home/categorias-home.module').then( m => m.CategoriasHomePageModule)
  },
  {
    path: 'categorias-leer', 
    loadChildren: () => import('./Categorias/categorias-leer/categorias-leer.module').then( m => m.CategoriasLeerPageModule)
  },
  {
    path: 'sub-categorias-actualizar/:subcategoria_id',
    loadChildren: () => import('./SubCategorias/sub-categorias-actualizar/sub-categorias-actualizar.module').then( m => m.SubCategoriasActualizarPageModule)
  },
  {
    path: 'sub-categorias-agregar',
    loadChildren: () => import('./SubCategorias/sub-categorias-agregar/sub-categorias-agregar.module').then( m => m.SubCategoriasAgregarPageModule)
  },
  {
    path: 'sub-categorias-home',
    loadChildren: () => import('./SubCategorias/sub-categorias-home/sub-categorias-home.module').then( m => m.SubCategoriasHomePageModule)
  },
  {
    path: 'sub-categorias-leer',
    loadChildren: () => import('./SubCategorias/sub-categorias-leer/sub-categorias-leer.module').then( m => m.SubCategoriasLeerPageModule)
  },
  {
    path: 'productos-actualizar/:producto_id',
    loadChildren: () => import('./productos/productos-actualizar/productos-actualizar.module').then( m => m.ProductosActualizarPageModule)
  },
  {
    path: 'productos-agregar',
    loadChildren: () => import('./productos/productos-agregar/productos-agregar.module').then( m => m.ProductosAgregarPageModule)
  },
  {
    path: 'productos-home',
    loadChildren: () => import('./productos/productos-home/productos-home.module').then( m => m.ProductosHomePageModule)
  },
  {
    path: 'productos-leer',
    loadChildren: () => import('./productos/productos-leer/productos-leer.module').then( m => m.ProductosLeerPageModule)
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}