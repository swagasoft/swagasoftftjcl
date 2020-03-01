import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PenaltyPageRoutingModule } from './penalty-routing.module';

import { PenaltyPage } from './penalty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PenaltyPageRoutingModule
  ],
  declarations: [PenaltyPage]
})
export class PenaltyPageModule {}
