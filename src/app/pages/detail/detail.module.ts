import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';

import { UpdateSpendComponent } from '../../components/update-spend/update-spend.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailPageRoutingModule
  ],
  entryComponents: [UpdateSpendComponent],
  declarations: [DetailPage, UpdateSpendComponent]
})
export class DetailPageModule { }
