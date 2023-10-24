import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrincipalPage } from './principal.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { principalPageRoutingModule } from './principal-routing.module';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    principalPageRoutingModule,

  ],
  declarations: [PrincipalPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class principalPageModule {}
