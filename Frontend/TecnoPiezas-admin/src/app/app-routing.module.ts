import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ListaProductosComponent } from './producto/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { DetallesProductoComponent } from './producto/detalles-producto/detalles-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
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
    path: 'locales-leer/:id',
    loadChildren: () => import('./Locales/locales-leer/locales-leer.module').then(m => m.LocalesLeerPageModule)
  },
  {
    path: 'locales-actualizar/:id',
    loadChildren: () => import('./Locales/locales-actualizar/locales-actualizar.module').then(m => m.LocalesActualizarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
