import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenditurePageRoutingModule } from './expenditure-routing.module';

import { ExpenditurePage } from './expenditure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenditurePageRoutingModule
  ],
  declarations: [ExpenditurePage]
})
export class ExpenditurePageModule {}
