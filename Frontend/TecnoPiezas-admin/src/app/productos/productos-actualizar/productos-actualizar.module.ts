import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosActualizarPageRoutingModule } from './productos-actualizar-routing.module';

import { ProductosActualizarPage } from './productos-actualizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductosActualizarPageRoutingModule
  ],
  declarations: [ProductosActualizarPage]
})
export class ProductosActualizarPageModule {}
