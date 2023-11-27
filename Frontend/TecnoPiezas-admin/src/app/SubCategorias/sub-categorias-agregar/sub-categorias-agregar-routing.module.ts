import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubCategoriasAgregarPage } from './sub-categorias-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: SubCategoriasAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoriasAgregarPageRoutingModule {}
