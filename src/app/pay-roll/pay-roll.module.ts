import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayRollPageRoutingModule } from './pay-roll-routing.module';

import { PayRollPage } from './pay-roll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayRollPageRoutingModule
  ],
  declarations: [PayRollPage]
})
export class PayRollPageModule {}
