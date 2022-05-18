import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from '../../layouts/user-layout/user-layout.component';
import { DashboardComponent } from '../../pages/user/dashboard/dashboard.component';
import { OrderListingComponent } from '../../pages/user/order-listing/order-listing.component';
import { TopNavComponent } from '../../layouts/user-layout/components/top-nav/top-nav.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [UserLayoutComponent, DashboardComponent, OrderListingComponent, TopNavComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    UserRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ],
})
export class UserModule { }
