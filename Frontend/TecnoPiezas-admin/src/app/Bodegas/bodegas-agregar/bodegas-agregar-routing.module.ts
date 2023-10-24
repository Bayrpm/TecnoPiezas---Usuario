import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegasAgregarPage } from './bodegas-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: BodegasAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegasAgregarPageRoutingModule {}
