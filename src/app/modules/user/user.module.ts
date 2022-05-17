import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from '../../layouts/user-layout/user-layout.component';


@NgModule({
  declarations: [UserLayoutComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
