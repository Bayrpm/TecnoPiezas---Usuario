import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegasLeerPage } from './bodegas-leer.page';

const routes: Routes = [
  {
    path: '',
    component: BodegasLeerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegasLeerPageRoutingModule {}
