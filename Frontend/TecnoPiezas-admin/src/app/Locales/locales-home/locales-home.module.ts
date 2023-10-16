import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalesHomePageRoutingModule } from './locales-home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';  
import { LocalesHomePage } from './locales-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalesHomePageRoutingModule,
    ReactiveFormsModule, 
  ],
  declarations: [LocalesHomePage]
})
export class LocalesHomePageModule {}
