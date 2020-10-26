import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpendDetailPageRoutingModule } from './spend-detail-routing.module';

import { SpendDetailPage } from './spend-detail.page';
import { SpendUpdateComponent } from '../../components/spend-update/spend-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpendDetailPageRoutingModule,
    ReactiveFormsModule,
  ],
  entryComponents: [SpendUpdateComponent],
  declarations: [SpendDetailPage, SpendUpdateComponent],
})
export class SpendDetailPageModule { }
