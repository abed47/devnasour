import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.scss']
})
export class ShopLayoutComponent implements OnInit, OnDestroy {
  public categoryList = [];
  public subscriptions: any[];
  public activeIndex = 0;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private layoutUtils: LayoutUtilsService,
    private request: RequestService,
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private handleCurrentRoute = (r?: any) => {
    if(this.router.url === '/shop') this.activeIndex = 0;
    if(this.router.url === '/shop/trending') this.activeIndex = 2;
    if(this.router.url === '/shop/deals') this.activeIndex = 3;
  }

  private loadSettings() {
    this.handleCurrentRoute();
    let ss = [];
    ss.push(this.router.events.subscribe(e => this.handleCurrentRoute(e)));
    this.subscriptions = [...ss];
    this.loadData();
  }

  private async loadData(){
    try {
      this.layoutUtils.showLoader();

      const categoryListRes: any = await this.request.getCategoryWithChildren().toPromise();
      if(Object.keys(categoryListRes?.data)){
        this.categoryList = Object.keys(categoryListRes.data).map(i => categoryListRes.data[i])
        this.categoryList.forEach((category, index) => {
          if (category?.children && Object.keys(category?.children)?.length){
            this.categoryList[index].children = 
            Object.keys(this.categoryList[index].children).map(i => this.categoryList[index].children[i])
          }
        })
      }
      
      $('.list-item img').height($('.list-item img').width())

      console.log(categoryListRes);
      $('.sub-category-item').hide();
      this.layoutUtils.hidePreloader();

      
    } catch (err) {
      this.layoutUtils.showSnack("error", err?.message || "server error");
      this.router.navigate(["/shop"]);
    }
    // this.layoutUtils.showLoader();
    // let catId = this.route.snapshot.params.id
    // this.request.getSubCategories(catId).then(r => {
    //   if(r.status === 1 && r.data?.length > 0){
    //     this.recommendedItemList = r.data.map(item => {
    //       return {
    //         id: item.web_category_id,
    //         name: item.web_category_name,
    //         description: item.web_category_description,
    //         photo: item.web_category_attachment_1
    //       }
    //     })
    //   }

    //   if(r.status === 1 && !r?.data?.length){
    //     //TODO: show error here later
    //   }
    // })
    // this.layoutUtils.hidePreloader();
  }

  public navigateTo(id: number | string){
    this.router.navigate([`/shop/c/${id}`]);
  }
}
