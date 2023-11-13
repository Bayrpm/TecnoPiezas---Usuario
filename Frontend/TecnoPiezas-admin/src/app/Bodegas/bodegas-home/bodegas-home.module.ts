import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodegasHomePageRoutingModule } from './bodegas-home-routing.module';

import { BodegasHomePage } from './bodegas-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BodegasHomePageRoutingModule
  ],
  declarations: [BodegasHomePage]
})
export class BodegasHomePageModule {}
