import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-mockups-listing',
  templateUrl: './mockups-listing.component.html',
  styleUrls: ['./mockups-listing.component.scss']
})
export class MockupsListingComponent implements OnInit {

  public pageNumber = 0;
  public totalRecords = 0;

  productList = [];

  constructor(
    private router: Router,
    private layoutUtils: LayoutUtilsService,
    private request: RequestService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    this.layoutUtils.showLoader();
    // for (let i = 0; i < 26; i++) {
    //   this.productList.push({
    //     name: "test Prodsadfasfasfasfasfsafdasfasfasfasdfsadfasdfuct " + i,
    //     rating: 3,
    //     price: 25,
    //     photo: "assets/images/box-image.png",
    //     id: 1
    //   })
    // }

    try {
      const res: any = await this.request.getMockups({
        offset: this.pageNumber * 15,
        limit: 15,
      })
      this.productList = [];
      if (res?.data?.length) {
        res.data.forEach(element => {
          this.productList.push({
            name: element.web_mockup_title,
            photo: element?.attachments?.[0],
            rating: element?.web_mockup_rating || 0,
            price: element?.web_mockup_price || 0,
            id: element.web_mockup_id
            // rating: 
          })
        });
      }

      this.totalRecords = res.total_record;
      this.layoutUtils.hidePreloader();
      console.log(res);
    } catch (err) {
      this.layoutUtils.hidePreloader();
      this.layoutUtils.showSnack("error", err?.message || "error loading mockups");
    }
  }


  public onMoveToPage(item: any){
    console.log(item);
    this.router.navigate([`/shop/mockup/${item.id}/${item.name.replaceAll(" ", "-")}`]);
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  public onPageEvent(e){
    console.log(e);
    this.pageNumber = e.pageIndex;
    this.loadData();
  }

}
