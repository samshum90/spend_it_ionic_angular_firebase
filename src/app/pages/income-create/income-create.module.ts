import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomeCreatePageRoutingModule } from './income-create-routing.module';

import { IncomeCreatePage } from './income-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IncomeCreatePageRoutingModule
  ],
  declarations: [IncomeCreatePage]
})
export class IncomeCreatePageModule { }
