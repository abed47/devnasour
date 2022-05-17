import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from 'src/app/layouts/user-layout/user-layout.component';
import { DashboardComponent } from 'src/app/pages/user/dashboard/dashboard.component';
import { OrderListingComponent } from 'src/app/pages/user/order-listing/order-listing.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'orders',
    component: OrderListingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
