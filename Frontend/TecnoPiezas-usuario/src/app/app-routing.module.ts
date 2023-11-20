import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrincipalPage } from './principal/principal.page';
import { DetallePage } from './detalle/detalle.page';


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
    path: 'registro',
    loadChildren: () => import('./accounts/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./accounts/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then( m => m.principalPageModule)
  },
  {
    path: 'detalle/:id',
    loadChildren: () => import('./detalle/detalle.module').then( m => m.DetallePageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
