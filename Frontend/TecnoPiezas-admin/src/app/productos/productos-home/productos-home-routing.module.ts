import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosHomePage } from './productos-home.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosHomePageRoutingModule {}
