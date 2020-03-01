import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchandisersPageRoutingModule } from './merchandisers-routing.module';

import { MerchandisersPage } from './merchandisers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchandisersPageRoutingModule
  ],
  declarations: [MerchandisersPage]
})
export class MerchandisersPageModule {}
