import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantProPageRoutingModule } from './merchant-pro-routing.module';

import { MerchantProPage } from './merchant-pro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantProPageRoutingModule
  ],
  declarations: []
})
export class MerchantProPageModule {}
