import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordForgetPageRoutingModule } from './password-forget-routing.module';

import { PasswordForgetPage } from './password-forget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordForgetPageRoutingModule
  ],
  declarations: [PasswordForgetPage]
})
export class PasswordForgetPageModule {}
