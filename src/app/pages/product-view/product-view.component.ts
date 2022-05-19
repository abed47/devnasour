import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageItem } from 'ng-gallery';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, AfterViewChecked {

  public pathNameSubject: Subject<any> = new Subject();
  public selectedQuantity = 0;
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
    sizing: ''
  };

  public relatedProductsList = [

  ]

  public relatedProductsSwiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    // loop: true,
    // centeredSlides: true,
    // initialSlide: 3
    
    // width: 500,
  }

  constructor(
    private route: ActivatedRoute, 
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private request: RequestService,
    private cart: CartService,
    ) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  ngAfterViewChecked(): void {
  }
  
  private loadData(){
    let productId = this.route.snapshot.params.id;
    this.layoutUtilsService.renamePath('Product name', productId);
    this.layoutUtilsService.showLoader();
    this.relatedProductsList = [];

    this.request.getProductDetails(productId)
    .then(r => {
      
      if(r && r?.status === 1){
        this.product.name = r.data.web_product_name;
        this.product.images = r?.data?.attachments?.map(item => new ImageItem({src: item, thumb: item})) || [];
        this.product.description = r.data.web_product_description;
        this.product.overview = r.data.web_product_overview;
        this.product.price = r.data.web_product_price;
        this.product.discount = +r.data.web_product_discount;
        //price opts
        this.product.priceList = r.data.quantity_pricing;
        this.selectedPrice = r.data.quantity_pricing[0].price;
        this.selectedQuantity = r.data.quantity_pricing[0].quantity;

        this.product.shipping = r.data.web_product_shipping;
        this.product.sizing = r.data.web_product_sizing;
        this.product.size = r.data.web_product_size;
        this.product.farmer = r.data.web_product_farmer;
        this.product.country = r.data.web_country_name;
        this.product.rating = +r?.data?.web_product_rate + 1 || 0;
        if(r?.data?.related_product) r.data.related_product.forEach(item => {
          this.relatedProductsList.push({
            name: item.web_product_name,
            price: item.web_product_price,
            rating: +item.web_product_rate || 0,
            photo: item.attachments[0],
            id: item.web_product_id
          })
        })
      }

      this.layoutUtilsService.hidePreloader();
    })
    .catch(e => {
      this.layoutUtilsService.hidePreloader();
    })

    
  }

  public handlePriceChange(e){
    let newP = this.product.priceList.filter(item => item.quantity === e);
    this.selectedPrice = newP[0].price;
    this.selectedQuantity = newP[0].quantity;
  }

  public navigateTo(e){
    this.router.navigate(['/shop/product/' + e]).then( e => {
      this.loadData();
    })
  }

  public addToCart(){
    this.cart.addItem({
      name: this.product.name,
      description: this.product.description,
      price: this.selectedPrice,
      quantity: this.selectedQuantity, 
      photo: this.product.images[0].data.src,
      discount: this.product.discount,
      id: this.route.snapshot.params.id,
    })
  }
}
