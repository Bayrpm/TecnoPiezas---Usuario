import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubCategoriasHomePage } from './sub-categorias-home.page';

const routes: Routes = [
  {
    path: '',
    component: SubCategoriasHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoriasHomePageRoutingModule {}
