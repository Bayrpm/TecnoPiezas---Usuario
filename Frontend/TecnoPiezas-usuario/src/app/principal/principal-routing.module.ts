import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { principalPage } from './principal.page';

const routes: Routes = [
  {
    path: '',
    component: principalPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class principalPageRoutingModule {}
