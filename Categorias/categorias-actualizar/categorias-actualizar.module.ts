import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasActualizarPageRoutingModule } from './categorias-actualizar-routing.module';

import { CategoriasActualizarPage } from './categorias-actualizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CategoriasActualizarPageRoutingModule
  ],
  declarations: [CategoriasActualizarPage]
})
export class CategoriasActualizarPageModule {}
