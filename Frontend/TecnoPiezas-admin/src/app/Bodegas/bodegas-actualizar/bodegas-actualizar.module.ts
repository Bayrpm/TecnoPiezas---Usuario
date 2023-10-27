import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegasActualizarPageRoutingModule } from './bodegas-actualizar-routing.module';

import { BodegasActualizarPage } from './bodegas-actualizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BodegasActualizarPageRoutingModule
  ],
  declarations: [BodegasActualizarPage]
})
export class BodegasActualizarPageModule {}
