import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageItem } from 'ng-gallery';
import { Subject } from 'rxjs';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, AfterViewChecked {

  public pathNameSubject: Subject<any> = new Subject();
  public selectedQuantity = 10;
  public product = {
    images: [],
    name: 'Test Product',
    rating: 3,
    overview: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
    price: 100,
    discount: null
  };

  public relatedProductsList = [
    {
      id: 1,
      photo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
      name: 'item name',
      price: 145,
      rating: 2
    }
  ]

  public relatedProductsSwiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    // loop: true,
    // centeredSlides: true,
    // initialSlide: 3
    
    // width: 500,
  }

  constructor(private route: ActivatedRoute, private layoutUtilsService: LayoutUtilsService) { }

  ngOnInit(): void {
    this.loadData();
    
    for(let i = 0; i < 10; i++){
      this.relatedProductsList.push({
        ...this.relatedProductsList[0],
        id: i + 2
      })
    }
  }
  
  ngAfterViewChecked(): void {
    // console.log('hello')
    
  }
  
  private loadData(){
    let productId = this.route.snapshot.params.id;
    this.layoutUtilsService.renamePath('Product name', productId)

    //loadImages
    let imgs = ['https://cdn.dribbble.com/users/1622978/screenshots/14702491/media/988b5e44bb80bcb73383a8bebcd71028.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg'];
    imgs.forEach(item => this.product.images.push(new ImageItem({src: item, thumb: item})))
  }

  

}
