import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchandisersPage } from './merchandisers.page';

const routes: Routes = [
  {
    path: '',
    component: MerchandisersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchandisersPageRoutingModule {}
