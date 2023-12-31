import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosAgregarPage } from './productos-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosAgregarPageRoutingModule {}
