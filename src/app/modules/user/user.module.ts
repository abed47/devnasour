import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from '../../layouts/user-layout/user-layout.component';
import { DashboardComponent } from '../../pages/user/dashboard/dashboard.component';
import { OrderListingComponent } from '../../pages/user/order-listing/order-listing.component';
import { TopNavComponent } from '../../layouts/user-layout/components/top-nav/top-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AddressListingComponent } from '../../pages/user/address-listing/address-listing.component';
import { CreateAddressComponent } from '../../pages/user/create-address/create-address.component';
import { OrderViewComponent } from '../../pages/user/order-view/order-view.component';
import { DownloadsComponent } from '../../pages/user/downloads/downloads.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [UserLayoutComponent, DashboardComponent, OrderListingComponent, TopNavComponent, AddressListingComponent, CreateAddressComponent, OrderViewComponent, DownloadsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    ChartsModule,
  ],
})
export class UserModule { }
