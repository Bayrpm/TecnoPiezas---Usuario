import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCategoriasAgregarPageRoutingModule } from './sub-categorias-agregar-routing.module';

import { SubCategoriasAgregarPage } from './sub-categorias-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SubCategoriasAgregarPageRoutingModule
  ],
  declarations: [SubCategoriasAgregarPage]
})
export class SubCategoriasAgregarPageModule {}
