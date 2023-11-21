import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasHomePageRoutingModule } from './categorias-home-routing.module';

import { CategoriasHomePage } from './categorias-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CategoriasHomePageRoutingModule
  ],
  declarations: [CategoriasHomePage]
})
export class CategoriasHomePageModule {}
