import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegasActualizarPage } from './bodegas-actualizar.page';

const routes: Routes = [
  {
    path: '',
    component: BodegasActualizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegasActualizarPageRoutingModule {}
