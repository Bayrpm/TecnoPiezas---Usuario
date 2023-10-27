import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegasLeerPageRoutingModule } from './bodegas-leer-routing.module';

import { BodegasLeerPage } from './bodegas-leer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodegasLeerPageRoutingModule
  ],
  declarations: [BodegasLeerPage]
})
export class BodegasLeerPageModule {}
