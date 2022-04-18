import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private layoutUtilsService: LayoutUtilsService) { }

  public project = {
    images: [],
    name: 'Test Product',
    rating: 3,
    description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
    models: [
      {
        title: '5x5 Card box',
        subtitle: '5x5x5 cm',
        description: 'cardboard light',
        selected: true
      },
      {
        title: '5x5 Card box',
        subtitle: '5x5x5 cm',
        description: 'cardboard light',
        selected: false
      },
      {
        title: '5x5 Card box',
        subtitle: '5x5x5 cm',
        description: 'cardboard light',
        selected: false
      },
      {
        title: '5x5 Card box',
        subtitle: '5x5x5 cm',
        description: 'cardboard light',
        selected: false
      },
    ]
  };

  public relatedProjects = [];

  ngOnInit(): void {

    this.loadData();
  }


  private loadData(){
    let projectId = this.route.snapshot.params.id;
    this.layoutUtilsService.renamePath('Product name', projectId)

    //loadImages
    let imgs = ['https://cdn.dribbble.com/users/1622978/screenshots/14702491/media/988b5e44bb80bcb73383a8bebcd71028.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg', 'https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD-File.jpg'];
    imgs.forEach(item => this.project.images.push(new ImageItem({src: item, thumb: item})))

    for(let i = 0; i < 3; i++){
      this.relatedProjects.push({
        id: i + 1,
        title: 'project ' + (i + 1),
        description: 'lorem lasf fsalfjslf saflsfasfj sflsdakfsaf sflksf sflskf sflsfjslfwerw lfksdjafjaldjsfasfw erw rwelrw;l flsakf;ewljfks flkwerjkl sfs',
        photo: 'https://i.ibb.co/v1TCQz8/ship.png'
      })
    }
  }

}
