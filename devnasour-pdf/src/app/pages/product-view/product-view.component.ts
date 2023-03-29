import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageItem } from 'ng-gallery';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit, AfterViewChecked {
  public file: any | null = null;
  public pathNameSubject: Subject<any> = new Subject();
  public selectedColor: number = null;
  public selectedQuantity = 0;
  public selectedSize = null;
  public selectedPrice = 0;
  public product = {
    images: [],
    name: '',
    rating: 0,
    overview: '',
    price: 0,
    discount: null,
    description: '',
    priceList: [],
    shipping: '',
    size: '',
    farmer: '',
    country: '',
    sizing: '',
    color: [],
    sizes: [],
  };

  public relatedProductsList = [];

  public relatedProductsSwiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    // loop: true,
    // centeredSlides: true,
    // initialSlide: 3
    // width: 500,
  };

  constructor(
    private route: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private request: RequestService,
    private cart: CartService,
    private favoriteService: FavoritesService,
    private layoutUtils: LayoutUtilsService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewChecked(): void {}

  private loadData(): void {
    const productId = this.route.snapshot.params.id;
    this.layoutUtilsService.renamePath('Product name', productId);
    this.layoutUtilsService.showLoader();
    this.relatedProductsList = [];

    this.request
      .getProductDetails(productId)
      .then((r) => {
        if (r && r?.status === 1) {
          console.log(r);
          this.product.name = r.data.web_product_name;
          this.product.images =
            r?.data?.attachments?.map(
              (item) => new ImageItem({ src: item, thumb: item })
            ) || [];
          this.product.description = r.data.web_product_description;
          this.product.overview = r.data.web_product_overview;
          this.product.price = r.data.web_product_price;
          this.product.discount = +r.data.web_product_discount;
          this.product.priceList = r.data.quantity_pricing;
          this.selectedPrice = r.data.quantity_pricing[0].price;
          this.selectedQuantity = r.data.quantity_pricing[0].quantity;
          this.product.color = r.data.product_color;
          this.product.shipping = r.data.web_product_shipping;
          this.product.sizing = r.data.web_product_sizing;
          this.product.size = r.data.web_product_size;
          this.product.farmer = r.data.web_product_farmer;
          this.product.country = r.data.web_country_name;
          this.product.rating = +r?.data?.web_product_rate + 1 || 0;
          this.product.sizes = r?.data?.product_size || [];
          if (r?.data?.product_size?.length) {
            this.selectedSize = r?.data?.product_size[0].web_product_size_id;
          }
          if (r?.data?.related_product) {
            r.data.related_product.forEach((item) => {
              this.relatedProductsList.push(item);
            });
          }
        }

        this.layoutUtilsService.hidePreloader();
      })
      .catch((e) => {
        this.layoutUtilsService.hidePreloader();
      });
  }

  public handlePriceChange(e): void {
    const newP = this.product.priceList.filter((item) => item.quantity === e);
    this.selectedPrice = newP[0].price;
    this.selectedQuantity = newP[0].quantity;
  }

  public handleSizeChange(e): void {
    this.selectedQuantity = e;
  }

  public navigateTo(e, name): void {
    this.router
      .navigate([`/shop/product/${e}/${name.replace(/\ /gi, '-')}`])
      .then((res: any) => {
        this.loadData();
      });
    if (window) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  public async addToCart(): Promise<void> {
    if (!this.colorSelectionValid() || !this.file) {
      return;
    }
    const fileUrl = await this.getBase64(this.file);
    const res = this.cart.addItem({
      name: this.product.name,
      description: this.product.description,
      price: this.selectedPrice,
      quantity: this.selectedQuantity,
      photo: this.product.images[0].data.src,
      discount: this.product.discount,
      id: this.route.snapshot.params.id,
      color: this.selectedColor,
      file: fileUrl,
      quantities: this.product.priceList,
      size: this.selectedSize,
    });
    if (res) {
      this.layoutUtilsService.showSnack('success', 'Product Added');
      this.layoutUtilsService.checkCartItemChange();
    }
  }

  public onColorChange(c): void {
    this.selectedColor = c.web_product_color_id;
  }

  public colorSelectionValid(): boolean {
    if (this.product.color?.length && !this.selectedColor) {
      this.layoutUtilsService.showSnack('error', 'Please select color!');
      return false;
    }
    return true;
  }

  public onProductClick(id, event, product?) {
    if (
      event.target.nodeName === 'MAT-ICON' ||
      event.target.nodeName === 'BUTTON'
    ) {
      this.handleFavorite(product);
      return;
    }
    this.router
      .navigate([
        `/shop/product/${id}/${product.web_product_name.replace(/\ /gi, '-')}`,
      ])
      .then(() => {
        if (window) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
        this.loadData();
      });
  }

  public onFileSelectChange(e) {
    if (e?.target?.files?.[0]) {
      this.file = e.target.files[0];
      return;
    }
    this.file = null;
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

  private getBase64(f) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function (error) {
        reject(error);
      };
    });
  }
}
