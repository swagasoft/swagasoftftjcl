import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FruitPageRoutingModule } from './fruit-routing.module';

import { FruitPage } from './fruit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FruitPageRoutingModule
  ],
  declarations: [FruitPage]
})
export class FruitPageModule {}
