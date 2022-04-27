import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { SeoService } from 'src/app/services/seo.service';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  @ViewChild('swiperSlideShow') swiperSlideShow!: any;

  public pageData: any = {};

  public swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    on: {
      slideChange: (e) => {
        this.activeBannerIndex = e.activeIndex;
      }
    },
    initialSlide: 0
  };

  public testimonialSwiperConfig: SwiperOptions = {
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    on: {
      slideChange: (e) => {
        this.activeBannerIndex = e.activeIndex;
      }
    },
    initialSlide: 0
  }

  public activeBannerIndex = 0;
  
  public midBannerItems = []

  public bannerItems = []

  public testimonialsList = [
    {
      photo: "https://i.ibb.co/874LjMT/12345.png",
      title: "Florie Jacobs",
      subtitle: "CEO of Company",
      details: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat",
      rating: 3
    },
    {
      photo: "https://i.ibb.co/874LjMT/12345.png",
      title: "Florie Jacobs",
      subtitle: "CEO of Company",
      details: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat",
      rating: 3
    },
    {
      photo: "https://i.ibb.co/874LjMT/12345.png",
      title: "Florie Jacobs",
      subtitle: "CEO of Company",
      details: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat",
      rating: 5
    },
    {
      photo: "https://i.ibb.co/874LjMT/12345.png",
      title: "Florie Jacobs",
      subtitle: "CEO of Company",
      details: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat",
      rating: 4
    },
    {
      photo: "https://i.ibb.co/874LjMT/12345.png",
      title: "Florie Jacobs",
      subtitle: "CEO of Company",
      details: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat",
      rating: 2.5
    },
    {
      photo: "https://i.ibb.co/874LjMT/12345.png",
      title: "Florie Jacobs",
      subtitle: "CEO of Company",
      details: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat",
      rating: 4.5
    },
  ]

  constructor(
    private router: Router,
    private request: RequestService,
    private seoService: SeoService,
    private layoutUtils: LayoutUtilsService
  ) { }

  ngOnInit(): void {
    // this.loadSettings();
    this.loadData();
  }

  private async loadData(){

    try{
      this.layoutUtils.showLoader();

      let mainDataRes = await this.request.getMetaDataSub(['home_desc_1', 'home_desc_2', 'home_desc_3', 'home_desc_4'], null).toPromise();
      let bannerRes = await this.request.getMetaDataSub(null, 'home_banner_').toPromise();
      console.log(bannerRes)

      if(mainDataRes?.status === 1) this.pageData = mainDataRes.data;
      if(bannerRes?.status === 1 && Object.keys(bannerRes?.data)?.length > 0){
        for(let item in bannerRes.data){
          this.bannerItems.push({
            photo: bannerRes.data[item]?.web_metadata_image || '',
            title: bannerRes.data[item]?.web_metadata_title || '',
            subtitle: bannerRes.data[item]?.web_metadata_value || '',
            details: bannerRes.data[item]?.web_metadata_description || '',
            linkUrl: bannerRes.data[item]?.web_metadata_link || '',
            linkTitle: 'learn about our success'
          })
        }
        this.loadSettings();
      }

      this.layoutUtils.hidePreloader();
    }catch(err){
      this.layoutUtils.hidePreloader();
      this.layoutUtils.showSnack("error", err?.message || 'server error');
    }
    
  }

  private loadSettings(){
    let innerW = window.innerWidth;

    if(innerW <= 700){
      this.midBannerItems = this.testimonialsList
    }

    if(innerW > 700){
      if(this.bannerItems.length > 2){
        this.midBannerItems = [...this.bannerItems]
        this.midBannerItems.splice(0, 1);
        this.midBannerItems.splice(this.midBannerItems.length - 1, 1);
      }
      if(this.bannerItems.length < 3){
        this.midBannerItems = this.bannerItems;
      }
    }
  }
  

  public onSwiper(e){
    // console.log('swiped: ', e);
  }

  public onSlideChange(e){
    this.activeBannerIndex = e.activeIndex;
  }

}
