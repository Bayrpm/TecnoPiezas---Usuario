import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosAgregarPageRoutingModule } from './productos-agregar-routing.module';
import { ImageUploadService } from '../../admin.service';
import { ProductosAgregarPage } from './productos-agregar.page';


@NgModule({
  declarations: [ProductosAgregarPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductosAgregarPageRoutingModule
  ],
  providers: [
    ImageUploadService, // Añade el servicio como proveedor aquí
  ],
})
export class ProductosAgregarPageModule {}
