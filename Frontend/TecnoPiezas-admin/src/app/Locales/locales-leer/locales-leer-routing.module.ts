import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalesLeerPage } from './locales-leer.page';

const routes: Routes = [
  {
    path: '',
    component: LocalesLeerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalesLeerPageRoutingModule {}
