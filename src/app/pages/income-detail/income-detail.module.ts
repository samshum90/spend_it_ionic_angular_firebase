import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomeDetailPageRoutingModule } from './income-detail-routing.module';

import { IncomeDetailPage } from './income-detail.page';
import { IncomeUpdateComponent } from '../../components/income-update/income-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomeDetailPageRoutingModule,
    ReactiveFormsModule,
  ],
  entryComponents: [IncomeUpdateComponent],
  declarations: [IncomeDetailPage, IncomeUpdateComponent]
})
export class IncomeDetailPageModule { }
