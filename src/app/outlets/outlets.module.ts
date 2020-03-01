import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletsPageRoutingModule } from './outlets-routing.module';

import { OutletsPage } from './outlets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletsPageRoutingModule
  ],
  declarations: [OutletsPage]
})
export class OutletsPageModule {}
