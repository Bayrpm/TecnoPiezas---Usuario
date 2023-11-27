import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasAgregarPage } from './categorias-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasAgregarPageRoutingModule {}
