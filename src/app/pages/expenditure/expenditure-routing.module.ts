import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenditurePage } from './expenditure.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenditurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenditurePageRoutingModule {}
