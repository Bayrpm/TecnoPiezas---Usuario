import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasLeerPage } from './categorias-leer.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasLeerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasLeerPageRoutingModule {}
