import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasActualizarPage } from './categorias-actualizar.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasActualizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasActualizarPageRoutingModule {}
