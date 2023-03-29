import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from 'src/app/layouts/user-layout/user-layout.component';
import { AddressListingComponent } from 'src/app/pages/user/address-listing/address-listing.component';
import { CreateAddressComponent } from 'src/app/pages/user/create-address/create-address.component';
import { DashboardComponent } from 'src/app/pages/user/dashboard/dashboard.component';
import { DownloadsComponent } from 'src/app/pages/user/downloads/downloads.component';
import { OrderListingComponent } from 'src/app/pages/user/order-listing/order-listing.component';
import { OrderViewComponent } from 'src/app/pages/user/order-view/order-view.component';
import { ViewAddressComponent } from 'src/app/pages/user/view-address/view-address.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    component: OrderListingComponent,
  },
  {
    path: 'addresses',
    component: AddressListingComponent
  },
  {
    path: 'addresses/create',
    component: CreateAddressComponent
  },
  {
    path: 'addresses/view/:id',
    component: ViewAddressComponent,
  },
  {
    path: 'orders/:id',
    component: OrderViewComponent,
  },
  {
    path: 'downloads',
    component: DownloadsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
