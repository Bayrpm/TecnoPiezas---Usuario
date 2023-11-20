import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalPage } from './principal.page';
import { DetallePage } from '../detalle/detalle.page';


const routes: Routes = [
  {
    path: '',
    component: PrincipalPage,
  },
  {
    path: 'detalle', // Nombre de la ruta para la lista de productos
    component: DetallePage
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class principalPageRoutingModule {}
