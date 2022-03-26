import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopLayoutComponent } from 'src/app/layouts/shop-layout/shop-layout.component';
import { ShopHomeComponent } from 'src/app/pages/shop-home/shop-home.component';
import { ShopListingComponent } from 'src/app/pages/shop-listing/shop-listing.component';
import { ShopTrendingComponent } from 'src/app/pages/shop-trending/shop-trending.component';

const routes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      {
        path: 'trending',
        component: ShopTrendingComponent
      },
      {
        path: 'home',
        component: ShopHomeComponent
      },
      {
        path: 'c/:id',
        component: ShopListingComponent
      },
      {
        path: '',
        component: ShopHomeComponent,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
