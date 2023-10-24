import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalesLeerPageRoutingModule } from './locales-leer-routing.module';

import { LocalesLeerPage } from './locales-leer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalesLeerPageRoutingModule
  ],
  declarations: [LocalesLeerPage]
})
export class LocalesLeerPageModule {}
