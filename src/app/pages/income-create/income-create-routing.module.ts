import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomeCreatePage } from './income-create.page';

const routes: Routes = [
  {
    path: '',
    component: IncomeCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomeCreatePageRoutingModule {}
