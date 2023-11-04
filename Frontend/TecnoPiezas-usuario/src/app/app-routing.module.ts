import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrincipalPage } from './principal/principal.page';
import { DescripcionComponent } from './descripcion/1/descripcion.component';


const routes: Routes = [


  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ver-productos',
    loadChildren: () => import('./Productos/ver-productos/ver-productos.module').then( m => m.VerProductosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    component: PrincipalPage,
  },
  {
    path: 'descripcion/1', // Nombre de la ruta para la lista de productos
    component: DescripcionComponent
  },
 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
