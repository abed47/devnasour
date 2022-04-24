import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {


  public banner1Config: SwiperOptions = {
    slidesPerView: 3.5,
    spaceBetween: 3,

    breakpoints:{
      700:{
        slidesPerView: 3.5
      },
      100:{
        slidesPerView: 1
      }
    }
  };
  public packagingBannerItems = [
    {
      photo: 'assets/images/rect.png'
    },
    {
      photo: 'assets/images/rect.png'
    },
 
    {
      photo: 'assets/images/rect.png'
    },
    {
      photo: 'assets/images/rect.png'
    },
 
    {
      photo: 'assets/images/rect.png'
    },
    {
      photo: 'assets/images/rect.png'
    },
 
    {
      photo: 'assets/images/rect.png'
    },
    {
      photo: 'assets/images/rect.png'
    },
 
    {
      photo: 'assets/images/rect.png'
    },
    {
      photo: 'assets/images/rect.png'
    },
 
  ]

  public locationBannerConfig: SwiperOptions = {
    loop: true,
    breakpoints: {
      700:{
        slidesPerView: 1.3,
        spaceBetween: 30
      },
      100:{
        slidesPerView: 1
      }
    }
  }
  public locations = [
    {
      title: 'Istanbul',
      description: 'lorem ipsum helo wlk slkf sfdlsfs fslflsf lsfsljfklsf fslfksdf sflksdfsfj sfjklk',
      photo: 'assets/images/rect.png'
    },
    {
      title: 'Istanbul',
      description: 'lorem ipsum helo wlk slkf sfdlsfs fslflsf lsfsljfklsf fslfksdf sflksdfsfj sfjklk',
      photo: 'assets/images/rect.png'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
