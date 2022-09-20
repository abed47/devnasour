import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { SwiperOptions } from 'swiper';
import { Perspective, AutoPlay } from "@egjs/flicking-plugins";
import { Plugin } from '@egjs/ngx-flicking';
import { FlickingOptions } from "@egjs/ngx-flicking"
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
    loop: true,
    spaceBetween: 50,
    autoplay: true,
    effect: "slide",
  }

  public sliderPlugins: Plugin[] = [
    new Perspective({rotate: 0.05, scale: 2}),
    new AutoPlay({direction: "NEXT", duration: 2000}),
  ];

  public mobileSliderPlugins: Plugin[] = [
    new Perspective({rotate: 0.05, scale: 2}),
    new AutoPlay({direction: "NEXT", duration: 800}),
  ];
  // public sliderConfig: FlickingOptions = {
  //   circular: true,
  //   align: "center",
  //   circularFallback: 
  // }

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
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }


}
