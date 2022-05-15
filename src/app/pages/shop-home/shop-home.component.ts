import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss']
})
export class ShopHomeComponent implements OnInit {

  public bannerItems = [];

  public bannerConfig: SwiperOptions = {
    slidesPerView: 3,
    centeredSlides: true,
    initialSlide: 1,
    // loop: true,
    spaceBetween: -40,
    // autoplay: true
  }

  constructor(private router: Router, private request: RequestService) { }

  ngOnInit(): void {
    this.loadData();
  }


  private loadData(){
    //TODO: add preloader here
    this.request.getMainCategories().then(res => {
      if(res && res?.status){
        this.bannerItems = res.data.main_category.map(item => {
          return {
            id: item.web_category_id,
            title: item.web_category_name,
            photo: item.web_category_attachment_1,
            description: item.web_category_description
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  public onItemClick(index){
    this.router.navigate(['/shop/c/' + index]);
  }
}
