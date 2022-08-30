import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';
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
    private request: RequestService,
    private favoriteService: FavoritesService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    this.layoutUtils.showLoader();

    try {
      const body = {
        action: "new_product_arrival",
        offset: this.getProductOffset(),
        limit: this.itemsPerPage,
      }
      const res: any = await this.request.getNewArrivals(body);
      this.layoutUtils.hidePreloader();
      
      this.totalRows = res.total_record;
      this.productList = res.data;
    } catch (err) {
      this.layoutUtils.hidePreloader();
      this.layoutUtils.showSnack("error", err?.message || 'Server error');
      this.router.navigate(["/home"]);
    }
  }

  private getProductOffset(){
    if(this.currentPage === 1) return 0;
    return this.currentPage * this.itemsPerPage;
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

  public onProductClick(id, event, product?) {
    if (event.target.nodeName === "MAT-ICON" || event.target.nodeName === "BUTTON") {
      this.handleFavorite(product);
      return;
    }
    this.router.navigate([`/shop/product/${id}`]);
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  public handleFavorite(p: any) {
    if (this.favoriteService.isItemLinked(p)){
      this.favoriteService.removeItem(p);
      this.layoutUtils.showSnack("success", "Removed from favorites");
      this.layoutUtils.checkCartItemChange();
      return;
    }
    this.favoriteService.addItem(p);
    this.layoutUtils.showSnack("success", "Added to favorites");
    this.layoutUtils.checkCartItemChange();
  }

  public isItemInFavorites(p: any) {
    return this.favoriteService.isItemLinked(p)
  }
}
