import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-shop-listing',
  templateUrl: './shop-listing.component.html',
  styleUrls: ['./shop-listing.component.scss']
})
export class ShopListingComponent implements OnInit {

  public bannerItems = [
    {
      photo: 'assets/images/banner-img.png',
      url: 'http://www.google.com'
    },
    {
      photo: 'assets/images/banner-img.png',
      url: 'http://www.yahoo.com'
    }
  ]

  public bannerConfig: SwiperOptions = {
    slidesPerView: 1,
    autoplay: true
  }

  public recommendedItemList = [
    {
      id: 1,
      photo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
      name: 'item name',
      price: 145,
      rating: 2
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    for(let i = 0; i < 14; i++){
      this.recommendedItemList.push({
        ...this.recommendedItemList[0],
        id: i + 2
      })
    }

    console.log(this.recommendedItemList)
  }

  public navigateTo(id: number | string){
    this.router.navigate([`/shop/product/${id}`]);
  }

}
