import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public ourStoryData = { title: '', description: '', image: '', subtitle: ''};
  public packagingData = { title: '', description: '', subtitle: '', images: []};
  public officesData = [];

  public banner1Config: SwiperOptions = {
    slidesPerView: 5.5,
    spaceBetween: 3,

    breakpoints:{
      1050: {
        slidesPerView: 3.8,
        spaceBetween: 5,
      },
      700:{
        slidesPerView: 4
      },
      100:{
        slidesPerView: 2.3,
        spaceBetween: 5
      }
    }
  };
  public packagingBannerItems = [ ]

  public locationBannerConfig: SwiperOptions = {
    loop: true,
    spaceBetween: 150,
    breakpoints: {
      // 700:{
      //   width: 300,
      //   spaceBetween: 150
      // },
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

  constructor(
    private request: RequestService,
    private layoutUtils: LayoutUtilsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData(){
    try{
      // this.layoutUtils.showLoader
      let packagingImagesPromise = this.request.getMetaDataSub(null, 'about_packaging_image_').toPromise();
      let officesPromise = this.request.getMetaDataSub(null, 'about_offices_').toPromise();
      let ourStory = await this.request.getMetaDataSub(['about_story_section'], null).toPromise();
      let aboutPackaging = await this.request.getMetaDataSub(['about_packaging_title'], null).toPromise();
      let packagingImages = await packagingImagesPromise;
      let aboutOffices = await officesPromise;
      
      if (ourStory.status === 1){
        this.ourStoryData.title = ourStory.data.about_story_section.web_metadata_title;
        this.ourStoryData.description = ourStory.data.about_story_section.web_metadata_description;
        this.ourStoryData.subtitle = ourStory.data.about_story_section.web_metadata_value;
        this.ourStoryData.image = ourStory.data.about_story_section.web_metadata_image;
      }

      if(packagingImages?.status === 1) {
        for (let item in packagingImages.data){
          this.packagingData.images.push(packagingImages.data[item].web_metadata_image)
        }
      }

      if (aboutPackaging.status === 1) {
        this.packagingData.title = aboutPackaging.data.about_packaging_title.web_metadata_title;
        this.packagingData.description = aboutPackaging.data.about_packaging_title.web_metadata_description;
        this.packagingData.subtitle = aboutPackaging.data.about_packaging_title.web_metadata_value;
      }

      if(aboutOffices.status === 1) {
        for (let item in aboutOffices.data) {
          this.officesData.push({
            title: aboutOffices.data[item].web_metadata_title,
            description: aboutOffices.data[item].web_metadata_description,
            image: aboutOffices.data[item].web_metadata_image,
          })
        }
      }
    }catch(err){
      // this.layoutUtils.hidePreloader();
      this.layoutUtils.showSnack('error', err?.message || 'server error');
      // this.router.navigate(['/'])
    }
  }

}
