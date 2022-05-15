import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-shop-item-listing',
  templateUrl: './shop-item-listing.component.html',
  styleUrls: ['./shop-item-listing.component.scss']
})
export class ShopItemListingComponent implements OnInit {

  public itemList: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private layoutUtils: LayoutUtilsService,
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(){
    this.layoutUtils.showLoader();
    let catId = this.route.snapshot.params.id;

    this.request.getCategoryProducts(catId)
    .then(r => {
      if(r && r?.status === 1 && r.data?.length){
        this.itemList = r.data.map(item => {
          return {
            id: item.web_product_id,
            photo: item.attachments?.[0] || '',
            name: item.web_product_name,
            rating: item.web_product_rate
          }
        })
      }
    })
    .catch(err => {
      console.log(err);
    })

    this.layoutUtils.hidePreloader();
    
  }

  public navigateTo(id: number | string){
    this.router.navigate([`/shop/product/${id}`]);
  }

}
