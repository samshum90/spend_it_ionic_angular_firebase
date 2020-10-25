import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpendCreatePage } from './spend-create.page';

const routes: Routes = [
  {
    path: '',
    component: SpendCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpendCreatePageRoutingModule {}
