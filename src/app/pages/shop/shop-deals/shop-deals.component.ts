import { Component, OnInit } from '@angular/core';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-shop-deals',
  templateUrl: './shop-deals.component.html',
  styleUrls: ['./shop-deals.component.scss']
})
export class ShopDealsComponent implements OnInit {

  public banners = []

  public onSaleItems = [
    {
      id: 1,
      photo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
      name: 'item name',
      price: 145,
      rating: 2
    },
  ]

  constructor(
    private request: RequestService,
    private layoutUtils: LayoutUtilsService
  ) { }

  ngOnInit(): void {

    for(let i = 1; i < 5; i++){
      this.onSaleItems.push({...this.onSaleItems[0], id: i + 1})
    }

    this.loadData();
  }

  async loadData() {
    try {
      console.log("loading data...");
      const dealsRes: any = await this.request.getDeals();
      console.log("dealsRespons: ", dealsRes);
      console.log("loaded data....");
      
      if (dealsRes?.data) {
        dealsRes.data.forEach(item => {
          this.banners.push({
            background: item.web_deal_image,
            title: item.web_deal_title,
            percentage: 10,
            description: item.web_deal_description,
            url: item.web_deal_link,
            size: this.getSize(item.web_deal_size_value),
            order: 6
          })
        })
      }
    } catch (err) {
      this.layoutUtils.showSnack("error", err?.message)
    }
  }

  private getSize (s: string) {
    switch (s) {
      case 'L':
        return 1;
      case 'H':
        return .5
      case 'Q':
        return .25
      default:
        return .75
    }
  }

}
