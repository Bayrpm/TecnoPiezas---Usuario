import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCategoriasActualizarPageRoutingModule } from './sub-categorias-actualizar-routing.module';

import { SubCategoriasActualizarPage } from './sub-categorias-actualizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SubCategoriasActualizarPageRoutingModule
  ],
  declarations: [SubCategoriasActualizarPage]
})
export class SubCategoriasActualizarPageModule {}
