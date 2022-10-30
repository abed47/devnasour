import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { SwiperOptions } from 'swiper';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-shop-listing',
  templateUrl: './shop-listing.component.html',
  styleUrls: ['./shop-listing.component.scss']
})
export class ShopListingComponent implements OnInit, AfterViewInit, OnDestroy {

  showSideMenu = false;
  currentVisible = 0;
  public categoryList = [];
  private subscriptions: Subscription[] = [];


  hasChild = (_: number, node: any) => node.expandable;

  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.web_category_name,
      id: node.web_category_id,
      level: level,
    };
  };

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

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

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private layoutUtils: LayoutUtilsService,
    private request: RequestService
    ) { }

  
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }


  ngAfterViewInit(): void {
    
    window.onresize = e => {
      $('.list-item img').height($('.list-item img').width())
    }

  }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    // this.subscriptions.push(this.router.events.subscribe())
    this.subscriptions.push(this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) this.loadData();
    }))
    this.loadData();
  }

  private async loadData(){
    try {
      this.layoutUtils.showLoader();
      let catId = this.route.snapshot.params.id;
      let catRes = await this.request.getSubCategories(catId);
      if(catRes.status === 1 && catRes.data?.length > 0){
        this.recommendedItemList = catRes.data.map(item => {
          return {
            id: item.web_category_id,
            name: item.web_category_name,
            description: item.web_category_description,
            photo: item.web_category_attachment_1
          }
        })
      }

      if(catRes.status === 1 && !catRes?.data?.length){
        this.layoutUtils.showSnack("error", catRes?.message || "server error");
        this.router.navigate(["/shop"]);
        if(window){
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
      }

      const categoryListRes: any = await this.request.getCategoryWithChildren().toPromise();
      if(Object.keys(categoryListRes?.data)){
        this.categoryList = Object.keys(categoryListRes.data).map(i => categoryListRes.data[i])
        this.categoryList.forEach((category, index) => {
          if (category?.children && Object.keys(category?.children)?.length){
            this.categoryList[index].children = 
            Object.keys(this.categoryList[index].children).map(i => this.categoryList[index].children[i])
          }
        });
        // this.dataSource = 
        this.dataSource.data = this.categoryList;
      }
      
      $('.list-item img').height($('.list-item img').width())

      $('.sub-category-item').hide();
      this.layoutUtils.hidePreloader();

      this?.treeControl?.expand(this?.treeControl?.dataNodes?.[0])
      
    } catch (err) {
      this.layoutUtils.showSnack("error", err?.message || "server error");
      this.router.navigate(["/shop"]);
      if(window){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
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

  public navigateTo(id: number | string, cat, isParent?){
    if (isParent) {
      this.router.navigate([`/shop/c/${id}`], {queryParams: {
        category: cat?.replace(/ /ig,"****")
      }});
    } else {
      this.router.navigate([`/shop/p/${id}`], {queryParams: {
        category: cat?.replace(/ /ig,"****")
      }});
    }
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  public showIfApplicable(e) {
    $('.sub-category-item').hide();
    $(`.${e.target.classList[0]}`).children('.sub-category-item').css("display", "flex")
  }

  public hideIfApplicable() {
    $('.sub-category-item').hide();
  }
}
