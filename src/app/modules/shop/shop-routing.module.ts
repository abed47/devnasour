import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopLayoutComponent } from 'src/app/layouts/shop-layout/shop-layout.component';
import { ProductViewComponent } from 'src/app/pages/product-view/product-view.component';
import { ShopDealsComponent } from 'src/app/pages/shop-deals/shop-deals.component';
import { ShopHomeComponent } from 'src/app/pages/shop-home/shop-home.component';
import { ShopItemListingComponent } from 'src/app/pages/shop-item-listing/shop-item-listing.component';
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
        path: 'p/:id',
        component: ShopItemListingComponent
      },
      {
        path: 'deals',
        component: ShopDealsComponent
      },
      {
        path: 'product/:id',
        component: ProductViewComponent
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
