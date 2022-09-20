import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopLayoutComponent } from 'src/app/layouts/shop-layout/shop-layout.component';
import { ProductViewComponent } from 'src/app/pages/product-view/product-view.component';
import { DesignsListingComponent } from 'src/app/pages/shop/designs-listing/designs-listing.component';
import { MockupsListingComponent } from 'src/app/pages/shop/mockups-listing/mockups-listing.component';
import { NewArrivalsListingComponent } from 'src/app/pages/shop/new-arrivals-listing/new-arrivals-listing.component';
import { PricingComponent } from 'src/app/pages/shop/pricing/pricing.component';
import { ShopDealsComponent } from 'src/app/pages/shop/shop-deals/shop-deals.component';
import { ShopHomeComponent } from 'src/app/pages/shop/shop-home/shop-home.component';
import { ShopItemListingComponent } from 'src/app/pages/shop/shop-item-listing/shop-item-listing.component';
import { ShopListingComponent } from 'src/app/pages/shop/shop-listing/shop-listing.component';
import { ShopTrendingComponent } from 'src/app/pages/shop/shop-trending/shop-trending.component';
import { ThreeDimentionalListingComponent } from 'src/app/pages/shop/three-dimentional-listing/three-dimentional-listing.component';

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
        path: 'product/:id/:name',
        component: ProductViewComponent
      },
      {
        path: 'pricing',
        component: PricingComponent,
      },
      {
        path: '3d',
        component: ThreeDimentionalListingComponent
      },
      {
        path: 'mockups',
        component: MockupsListingComponent
      },{
        path: 'designs',
        component: DesignsListingComponent
      },
      {
        path: 'new-arrivals',
        component: NewArrivalsListingComponent,
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
