import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosActualizarPage } from './productos-actualizar.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosActualizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosActualizarPageRoutingModule {}
