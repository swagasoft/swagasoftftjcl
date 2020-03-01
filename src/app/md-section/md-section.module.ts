import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MdSectionPageRoutingModule } from './md-section-routing.module';

import { MdSectionPage } from './md-section.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MdSectionPageRoutingModule
  ],
  declarations: [MdSectionPage]
})
export class MdSectionPageModule {}
