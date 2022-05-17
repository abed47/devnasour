import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from '../../layouts/user-layout/user-layout.component';
import { DashboardComponent } from '../../pages/user/dashboard/dashboard.component';


@NgModule({
  declarations: [UserLayoutComponent, DashboardComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
