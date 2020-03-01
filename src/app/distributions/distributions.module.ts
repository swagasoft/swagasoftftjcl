import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DistributionsPageRoutingModule } from './distributions-routing.module';

import { DistributionsPage } from './distributions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DistributionsPageRoutingModule
  ],
  declarations: [DistributionsPage]
})
export class DistributionsPageModule {}
