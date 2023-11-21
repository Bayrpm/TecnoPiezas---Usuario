import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ListaProductosComponent } from './producto/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { DetallesProductoComponent } from './producto/detalles-producto/detalles-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-sesion-privado',
    pathMatch: 'full'
  },
  { path: 'productos', component: ListaProductosComponent },
  { path: 'productos/editar/:id', component: EditarProductoComponent },
  { path: 'productos/crear', component: CrearProductoComponent },
  { path: 'productos/detalles/:id', component: DetallesProductoComponent },
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
    path: 'inicio-sesion-privado',
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
    path: 'cambiar-contrasena',
    loadChildren: () => import('./accounts/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },




  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
