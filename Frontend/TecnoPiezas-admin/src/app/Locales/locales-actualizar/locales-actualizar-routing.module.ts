import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalesActualizarPage } from './locales-actualizar.page';

const routes: Routes = [
  {
    path: '',
    component: LocalesActualizarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalesActualizarPageRoutingModule {}
