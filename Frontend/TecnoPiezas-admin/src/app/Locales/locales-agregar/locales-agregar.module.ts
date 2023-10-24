import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';


import { LocalesAgregarPageRoutingModule } from './locales-agregar-routing.module';
import { LocalesAgregarPage } from './locales-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LocalesAgregarPageRoutingModule
  ],
  declarations: [LocalesAgregarPage]
})
export class LocalesAgregarPageModule {}
