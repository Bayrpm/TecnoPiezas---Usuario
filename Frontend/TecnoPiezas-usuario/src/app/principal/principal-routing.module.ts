import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalPage } from './principal.page';
import { DescripcionComponent } from '../descripcion/1/descripcion.component';


const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class principalPageRoutingModule {}
