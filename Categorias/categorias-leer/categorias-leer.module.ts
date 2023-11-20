import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasLeerPageRoutingModule } from './categorias-leer-routing.module';

import { CategoriasLeerPage } from './categorias-leer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriasLeerPageRoutingModule
  ],
  declarations: [CategoriasLeerPage]
})
export class CategoriasLeerPageModule {}
