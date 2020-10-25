import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpendCreatePageRoutingModule } from './spend-create-routing.module';

import { SpendCreatePage } from './spend-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SpendCreatePageRoutingModule
  ],
  declarations: [SpendCreatePage]
})
export class SpendCreatePageModule { }
