import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FruitPage } from './fruit.page';

const routes: Routes = [
  {
    path: '',
    component: FruitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FruitPageRoutingModule {}
