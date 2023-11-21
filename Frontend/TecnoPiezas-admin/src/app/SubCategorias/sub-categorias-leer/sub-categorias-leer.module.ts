import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCategoriasLeerPageRoutingModule } from './sub-categorias-leer-routing.module';

import { SubCategoriasLeerPage } from './sub-categorias-leer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubCategoriasLeerPageRoutingModule
  ],
  declarations: [SubCategoriasLeerPage]
})
export class SubCategoriasLeerPageModule {}
