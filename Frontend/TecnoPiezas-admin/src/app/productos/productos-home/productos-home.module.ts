import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosHomePageRoutingModule } from './productos-home-routing.module';

import { ProductosHomePage } from './productos-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductosHomePageRoutingModule
  ],
  declarations: [ProductosHomePage]
})
export class ProductosHomePageModule {}
