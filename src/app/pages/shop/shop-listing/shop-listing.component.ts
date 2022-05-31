import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
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

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private layoutUtils: LayoutUtilsService,
    private request: RequestService
    ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    this.layoutUtils.showLoader();
    let catId = this.route.snapshot.params.id
    this.request.getSubCategories(catId).then(r => {
      if(r.status === 1 && r.data?.length > 0){
        this.recommendedItemList = r.data.map(item => {
          return {
            id: item.web_category_id,
            name: item.web_category_name,
            description: item.web_category_description,
            photo: item.web_category_attachment_1
          }
        })
      }

      if(r.status === 1 && !r?.data?.length){
        //TODO: show error here later
      }
    })
    this.layoutUtils.hidePreloader();
  }

  public navigateTo(id: number | string){
    this.router.navigate([`/shop/p/${id}`]);
  }

}
