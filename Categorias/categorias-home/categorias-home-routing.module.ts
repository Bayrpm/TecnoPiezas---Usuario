import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasHomePage } from './categorias-home.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasHomePageRoutingModule {}
