import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantProPage } from './merchant-pro.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantProPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantProPageRoutingModule {}
