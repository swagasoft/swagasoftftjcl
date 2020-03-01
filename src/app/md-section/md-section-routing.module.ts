import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MdSectionPage } from './md-section.page';

const routes: Routes = [
  {
    path: '',
    component: MdSectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MdSectionPageRoutingModule {}
