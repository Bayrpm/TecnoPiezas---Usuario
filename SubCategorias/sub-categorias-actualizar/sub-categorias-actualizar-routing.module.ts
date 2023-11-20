import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubCategoriasActualizarPage } from './sub-categorias-actualizar.page';

const routes: Routes = [
  {
    path: '',
    component: SubCategoriasActualizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoriasActualizarPageRoutingModule {}
