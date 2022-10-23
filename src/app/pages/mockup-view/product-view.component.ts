import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageItem } from 'ng-gallery';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { SwiperOptions } from 'swiper';
import Snap from 'snapsvg-cjs';


// var s = Snap("#snappy");


@Component({
  selector: 'app-mockup-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class MockupViewComponent implements OnInit, AfterViewChecked {

  public pathNameSubject: Subject<any> = new Subject();
  public selectedColor: number = null;
  public selectedQuantity = 0;
  public selectedPrice = 0;
  public imgPreview = null;
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
  private s;
  @ViewChild("snapped") public imageViewRef: ElementRef<SVGElement>

  constructor(
    private route: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private request: RequestService,
    private cart: CartService,
    ) {

      this.s = Snap('#snappy');
     }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewChecked(): void {
  }

  private onSVGLoaded(data, e,st) {
    // console.log("lsdkfjsldfj", data.select("#Layer_1"))
    console.log(data);
    var b = this.s.append( data );
    var bbox = b.getBBox();
    var vbox = bbox.x + " " + bbox.y + " " + bbox.width + " " + bbox.height;                                           
    this.s.attr({ viewBox: vbox });
  }

  private async loadData(){
    this.s = Snap('#snappy');
    let mat = this.s.rect(0, 0, 300, 300).attr({
        fill:"#ffff00"
    });    

    const data = await this.request.downloadFile("https://svgur.com/i/nbA.svg");
    console.log(data);

    const productId = this.route.snapshot.params.id;
    this.layoutUtilsService.renamePath('Product name', productId);
    this.layoutUtilsService.showLoader();
    this.relatedProductsList = [];

    this.request.getProductDetails(productId)
    .then(r => {

      Snap.load("http://upload.wikimedia.org/wikipedia/commons/b/b0/NewTux.svg", this.onSVGLoaded);


      if (r && r?.status === 1){
        this.product.name = r.data.web_product_name;
        this.product.images = r?.data?.attachments?.map(item => new ImageItem({src: item, thumb: item})) || [];
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
        if (r?.data?.related_product) { 
          
          r.data.related_product.forEach(item => {
          this.relatedProductsList.push({
            name: item.web_product_name,
            price: item.web_product_price,
            rating: +item.web_product_rate || 0,
            photo: item.attachments[0],
            id: item.web_product_id
          });
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
    if (!this.colorSelectionValid()) { return; }
    const res = this.cart.addItem({
      name: this.product.name,
      description: this.product.description,
      price: this.selectedPrice,
      quantity: this.selectedQuantity,
      photo: this.product.images[0].data.src,
      discount: this.product.discount,
      id: this.route.snapshot.params.id,
      color: this.selectedColor,
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
}