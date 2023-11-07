import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrincipalPage } from './principal/principal.page';
import { DescripcionComponent } from './descripcion/1/descripcion.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/principal', // Redirige a la página "principal" en la pestaña "tabs"
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ver-productos',
    loadChildren: () => import('./Productos/ver-productos/ver-productos.module').then( m => m.VerProductosPageModule)
  },
  {
    path: '',
    component: PrincipalPage,
  },
  {
    path: 'descripcion/1/:id', // Nombre de la ruta para la lista de productos
    loadChildren: () => import('./descripcion/1/descripcion.module').then( m => m.descripcionComponentModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./accounts/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./accounts/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },

 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
