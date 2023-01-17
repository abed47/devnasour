import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageItem } from 'ng-gallery';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { SwiperOptions } from 'swiper';
import Snap from 'snapsvg-cjs';
import { FavoritesService } from 'src/app/services/favorites.service';
import { AuthService } from 'src/app/services/auth.service';


// var s = Snap("#snappy");


@Component({
  selector: 'app-mockup-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class MockupViewComponent implements OnInit, AfterViewChecked {
  public file: any | null = null;
  public pathNameSubject: Subject<any> = new Subject();
  public selectedColor: number = null;
  public selectedQuantity = 0;
  public selectedSize = null;
  public selectedPrice = 0;
  public printTypes = [];
  public selectedPrintType = null;
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
    sizes: []
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
    private layoutUtils: LayoutUtilsService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewChecked(): void {
  }

  private async loadData(): Promise<void>{
    const productId = this.route.snapshot.params.id;
    this.layoutUtilsService.renamePath('Mockup name', productId);
    this.layoutUtilsService.showLoader();
    this.relatedProductsList = [];

    //get print types
    const pTypesRes: any = await this.request.getPrintType();
    this.printTypes = pTypesRes?.data ?? []

    console.log("print types: ", pTypesRes)

    this.request.getMockups({ mockup_id: productId })
    .then((r: any) => {

      if (r && r?.status === 1){
        
        this.product.color = r?.data?.[0]?.colors;
        this.product.name = r?.data?.[0]?.web_mockup_title;
        this.product.images = r.data[0]?.attachments?.map(item => {
          console.log(item);
          return new ImageItem({src: item, thumb: item})
        }) || [];
        this.product.description = r?.data?.[0]?.web_mockup_description;
        this.product.overview = r?.data?.[0]?.web_mockup_overview;
        this.product.price = r?.data?.[0]?.web_mockup_price;
        this.product.discount = +r?.data?.[0]?.web_mockup_discount;
        this.product.priceList = r?.data?.[0]?.quantity_pricing;
        this.selectedPrice = r?.data?.[0]?.quantity_pricing[0].price;
        this.selectedQuantity = r?.data?.[0]?.quantity_pricing[0].quantity;
        this.product.shipping = r?.data?.[0]?.web_mockup_shipping;
        this.product.sizing = r?.data?.[0]?.web_mockup_sizing;
        this.product.size = r?.data?.[0]?.web_mockup_size;
        this.product.farmer = r?.data?.[0]?.web_mockup_farmer;
        this.product.country = r?.data?.[0]?.web_country_name;
        this.product.rating = +r.data[0]?.web_mockup_rate + 1 || 0;
        this.product.sizes = r.data[0]?.web_mockup_sizing || [];

        

        console.log(this.product, "sdfdsfsfdsfds");
        if (r.data[0]?.product_size?.length) {
          this.selectedSize = r.data[0]?.product_size[0].web_mockup_size_id;
        }
        if (r.data[0]?.related_product) { r.data.related_product.forEach(item => {
          this.relatedProductsList.push(item);
        });
        }
      }

      this.layoutUtilsService.hidePreloader();
    })
    .catch(e => {
      this.layoutUtilsService.hidePreloader();
    });


  }

  public handlePriceChange(e): void{
    const newP = this.product.priceList.filter(item => item.quantity === e);
    this.selectedPrice = newP[0].price;
    this.selectedQuantity = newP[0].quantity;
  }

  public handleSizeChange(e): void{
    this.selectedQuantity = e;
  }

  public navigateTo(e, name): void{
    this.router.navigate([`/shop/product/${e}/${name.replace(/\ /ig, "-")}`]).then( (res: any) => {
      this.loadData();
    });
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  public addToCart(): void{
    if (!this.authService.getAuthStatus()?.loggedIn){
      this.router.navigate(['/login']);
      if(window){
       window.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
       });
     }
      return;
   }
    if (!this.colorSelectionValid()) { return; }
    this.router.navigate([`/mockup-add-to-cart/${this.route.snapshot.params.id}/${this.selectedColor}`]);
  }

  public onColorChange(c): void {
    this.selectedColor = c.color_id;
  }

  public colorSelectionValid(): boolean {
    if (this.product.color?.length && !this.selectedColor) {
      this.layoutUtilsService.showSnack('error', 'Please select color!');
      return false;
    }
    return true;
  }

  public onProductClick(id, event, product?) {
    if (event.target.nodeName === "MAT-ICON" || event.target.nodeName === "BUTTON") {
      this.handleFavorite(product);
      return;
    }
    this.router.navigate([`/shop/product/${id}/${product.web_mockup_title.replace(/\ /ig, "-")}`]).then(() => {
      if(window){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
      this.loadData()
    });
  }

  public onFileSelectChange(e) {
    if (e?.target?.files?.[0]){
      this.file = e.target.files[0];
      return;
    }
    this.file = null;
  }

  public isItemInFavorites(p: any) {
    return this.favoriteService.isItemLinked(p)
  }

  public handleFavorite(p: any) {
    if (this.favoriteService.isItemLinked(p)){
      this.favoriteService.removeItem(p);
      this.layoutUtils.showSnack("success", "Removed from favorites");
      this.layoutUtils.checkCartItemChange();
      return;
    }
    const res = this.favoriteService.addItem(p);
    if (res) {
      this.layoutUtils.showSnack("success", "Added to favorites");
      this.layoutUtils.checkCartItemChange();
    }
  }

  public handleDecorationChange(e: any) {
    this.selectedPrintType = e;
  }
}
