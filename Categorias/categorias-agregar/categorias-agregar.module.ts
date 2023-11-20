import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasAgregarPageRoutingModule } from './categorias-agregar-routing.module';

import { CategoriasAgregarPage } from './categorias-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CategoriasAgregarPageRoutingModule
  ],
  declarations: [CategoriasAgregarPage]
})
export class CategoriasAgregarPageModule {}
