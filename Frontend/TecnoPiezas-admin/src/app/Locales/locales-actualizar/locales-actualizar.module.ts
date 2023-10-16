import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalesActualizarPageRoutingModule } from './locales-actualizar-routing.module';

import { LocalesActualizarPage } from './locales-actualizar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LocalesActualizarPageRoutingModule
  ],
  declarations: [LocalesActualizarPage]
})
export class LocalesActualizarPageModule {}
