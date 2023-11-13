import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DescripcionComponent } from './descripcion.component';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { descripcionComponentRoutingModule } from './descripcion-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    descripcionComponentRoutingModule

  ],
  declarations: [DescripcionComponent]
  
})
export class descripcionComponentModule {}