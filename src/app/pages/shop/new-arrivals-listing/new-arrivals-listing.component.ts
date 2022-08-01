import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-new-arrivals-listing',
  templateUrl: './new-arrivals-listing.component.html',
  styleUrls: ['./new-arrivals-listing.component.scss']
})
export class NewArrivalsListingComponent implements OnInit {

  productList = [];
  currentPage = 1;
  itemsPerPage = 15;
  totalRows = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private layoutUtils: LayoutUtilsService,
    private request: RequestService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    this.layoutUtils.showLoader();

    try {
      const body = {
        action: "new_product_arrival",
        offset: this.currentPage * this.itemsPerPage,
        limit: this.itemsPerPage,
      }
      const res: any = await this.request.getNewArrivals(body);
      this.layoutUtils.hidePreloader();
      
      this.totalRows = res.total_record;
      this.productList = res.data;
      console.log(res);
    } catch (err) {
      this.layoutUtils.hidePreloader();
      this.layoutUtils.showSnack("error", err?.message || 'Server error');
      this.router.navigate(["/home"]);
    }
  }

  public onPageEvent(e: any){
    this.currentPage = e.pageIndex;
    this.loadData();
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  public onProductClick(id) {
    this.router.navigate([`/shop/product/${id}`]);
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }
}
