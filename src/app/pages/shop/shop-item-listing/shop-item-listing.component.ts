import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-shop-item-listing',
  templateUrl: './shop-item-listing.component.html',
  styleUrls: ['./shop-item-listing.component.scss'],
})
export class ShopItemListingComponent implements OnInit {
  productList = [];
  currentPage = 1;
  itemsPerPage = 15;
  totalRows = 0;
  pageTitle = '';
  task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'item', completed: false, color: 'primary' },
      { name: 'item', completed: false, color: 'primary' },
      { name: 'item', completed: false, color: 'primary' },
      { name: 'item', completed: false, color: 'primary' },
      { name: 'item', completed: false, color: 'primary' },
    ],
  };
  allComplete: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private layoutUtils: LayoutUtilsService,
    private request: RequestService,
    private favoriteService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.getPageTitle();
  }

  private async loadData() {
    this.layoutUtils.showLoader();
    let catId = this.route.snapshot.params.id;

    let catRes = await this.request.getSubCategories(catId);
    this.request
      .getCategoryProducts(catId)
      .then((r) => {
        if (r && r?.status === 1 && r.data?.length) {
          this.productList = r.data;
          console.log(r);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.layoutUtils.hidePreloader();
  }

  private getProductOffset() {
    if (this.currentPage === 1) return 0;
    return this.currentPage * this.itemsPerPage;
  }

  public onPageEvent(e: any) {
    this.currentPage = e.pageIndex;
    this.loadData();
    if (window) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  public onProductClick(id, event, product?) {
    if (
      event.target.nodeName === 'MAT-ICON' ||
      event.target.nodeName === 'BUTTON'
    ) {
      this.handleFavorite(product);
      return;
    }
    this.router.navigate([
      `/shop/product/${id}/${product.web_product_name.replace(/\ /gi, '-')}`,
    ]);
    if (window) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  public handleFavorite(p: any) {
    if (this.favoriteService.isItemLinked(p)) {
      this.favoriteService.removeItem(p);
      this.layoutUtils.showSnack('success', 'Removed from favorites');
      this.layoutUtils.checkCartItemChange();
      return;
    }
    const res = this.favoriteService.addItem(p);
    if (res) {
      this.layoutUtils.showSnack('success', 'Added to favorites');
      this.layoutUtils.checkCartItemChange();
    }
  }

  public isItemInFavorites(p: any) {
    return this.favoriteService.isItemLinked(p);
  }

  getPageTitle() {
    this.route.queryParams
      .subscribe((r) => {
        if (r?.category) {
          this.pageTitle = r.category.replace(/\*\*\*\*/gi, ' ');
        }
      })
      .unsubscribe();
  }

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }
}
