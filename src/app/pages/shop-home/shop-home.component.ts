import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss']
})
export class ShopHomeComponent implements OnInit {

  public bannerItems = [
    {
      id: 1,
      photo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      title: 'Test 1',
      description: 'description wir here lsdfsa sadfjsajdf fsadfsd'
    },
    {
      id: 2,
      photo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      title: 'Test 1',
      description: 'description wir here lsdfsa sadfjsajdf fsadfsd'
    },
    {
      id: 3,
      photo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
      title: 'Test 1',
      description: 'description wir here lsdfsa sadfjsajdf fsadfsd'
    },
  ]

  public bannerConfig: SwiperOptions = {
    slidesPerView: 3,
    centeredSlides: true,
    initialSlide: 1,
    // loop: true,
    spaceBetween: -40,
    // autoplay: true
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onItemClick(index){
    this.router.navigate(['/shop/c/' + index]);
  }
}
