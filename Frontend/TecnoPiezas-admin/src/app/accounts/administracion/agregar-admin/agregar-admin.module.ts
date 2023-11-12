import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAdminPageRoutingModule } from './agregar-admin-routing.module';

import { AgregarAdminPage } from './agregar-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAdminPageRoutingModule
  ],
  declarations: [AgregarAdminPage]
})
export class AgregarAdminPageModule {}
