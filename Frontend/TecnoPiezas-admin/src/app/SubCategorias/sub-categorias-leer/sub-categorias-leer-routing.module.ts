import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubCategoriasLeerPage } from './sub-categorias-leer.page';

const routes: Routes = [
  {
    path: '',
    component: SubCategoriasLeerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoriasLeerPageRoutingModule {}
