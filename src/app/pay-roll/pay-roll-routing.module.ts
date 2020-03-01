import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayRollPage } from './pay-roll.page';

const routes: Routes = [
  {
    path: '',
    component: PayRollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayRollPageRoutingModule {}
