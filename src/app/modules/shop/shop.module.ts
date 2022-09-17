import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopHomeComponent } from '../../pages/shop/shop-home/shop-home.component';
import { ShopLayoutComponent } from '../../layouts/shop-layout/shop-layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShopTrendingComponent } from '../../pages/shop/shop-trending/shop-trending.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ShopListingComponent } from '../../pages/shop/shop-listing/shop-listing.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { ShopDealsComponent } from '../../pages/shop/shop-deals/shop-deals.component';
import { ProductViewComponent } from '../../pages/product-view/product-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatRippleModule} from '@angular/material/core';
import { RequestService } from 'src/app/services/request.service';
import { HttpClientModule } from '@angular/common/http';
import { ShopItemListingComponent } from '../../pages/shop/shop-item-listing/shop-item-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PricingComponent } from '../../pages/shop/pricing/pricing.component';
import { DesignsListingComponent } from '../../pages/shop/designs-listing/designs-listing.component';
import { MockupsListingComponent } from '../../pages/shop/mockups-listing/mockups-listing.component';
import { ThreeDimentionalListingComponent } from '../../pages/shop/three-dimentional-listing/three-dimentional-listing.component';
import { NgxFlickingModule } from "@egjs/ngx-flicking";
import { MatBadgeModule } from '@angular/material/badge';
import { NewArrivalsListingComponent } from '../../pages/shop/new-arrivals-listing/new-arrivals-listing.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FavoritesService } from 'src/app/services/favorites.service';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [ShopHomeComponent, ShopLayoutComponent, ShopTrendingComponent, ShopListingComponent, ShopDealsComponent, ProductViewComponent, ShopItemListingComponent, PricingComponent, DesignsListingComponent, MockupsListingComponent, ThreeDimentionalListingComponent, NewArrivalsListingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShopRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgxUsefulSwiperModule,
    NgxStarRatingModule,
    NgxMaterialRatingModule,
    SharedModule,
    MatRippleModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    NgxFlickingModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [
    RequestService,
    FavoritesService
  ]
})
export class ShopModule { }
