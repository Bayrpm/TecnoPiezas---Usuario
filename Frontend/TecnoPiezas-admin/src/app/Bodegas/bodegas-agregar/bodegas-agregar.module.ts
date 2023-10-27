import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegasAgregarPageRoutingModule } from './bodegas-agregar-routing.module';

import { BodegasAgregarPage } from './bodegas-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BodegasAgregarPageRoutingModule
  ],
  declarations: [BodegasAgregarPage]
})
export class BodegasAgregarPageModule {}
