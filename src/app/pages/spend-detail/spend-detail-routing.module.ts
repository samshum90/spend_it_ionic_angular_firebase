import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpendDetailPage } from './spend-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SpendDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpendDetailPageRoutingModule {}
