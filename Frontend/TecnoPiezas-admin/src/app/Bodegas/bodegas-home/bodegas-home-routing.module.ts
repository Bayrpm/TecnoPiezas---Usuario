import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodegasHomePage } from './bodegas-home.page';

const routes: Routes = [
  {
    path: '',
    component: BodegasHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegasHomePageRoutingModule {}
