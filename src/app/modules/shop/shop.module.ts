import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopHomeComponent } from '../../pages/shop-home/shop-home.component';
import { ShopLayoutComponent } from '../../layouts/shop-layout/shop-layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShopTrendingComponent } from '../../pages/shop-trending/shop-trending.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ShopListingComponent } from '../../pages/shop-listing/shop-listing.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxMaterialRatingModule } from 'ngx-material-rating';

@NgModule({
  declarations: [ShopHomeComponent, ShopLayoutComponent, ShopTrendingComponent, ShopListingComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgxUsefulSwiperModule,
    NgxStarRatingModule,
    NgxMaterialRatingModule
  ]
})
export class ShopModule { }
