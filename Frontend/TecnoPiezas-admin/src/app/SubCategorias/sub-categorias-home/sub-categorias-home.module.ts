import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCategoriasHomePageRoutingModule } from './sub-categorias-home-routing.module';

import { SubCategoriasHomePage } from './sub-categorias-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SubCategoriasHomePageRoutingModule
  ],
  declarations: [SubCategoriasHomePage]
})
export class SubCategoriasHomePageModule {}
