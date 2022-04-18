import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.scss']
})
export class ProjectListingComponent implements OnInit {

  public itemList = [];

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(){
    for(let i = 0; i < 20; i++){
      this.itemList.push({
        id: i + 1,
        title: 'project ' + (i + 1),
        description: 'lorem lasf fsalfjslf saflsfasfj sflsdakfsaf sflksf sflskf sflsfjslfwerw lfksdjafjaldjsfasfw erw rwelrw;l flsakf;ewljfks flkwerjkl sfs',
        photo: 'https://i.ibb.co/v1TCQz8/ship.png'
      })
    }
  }

}
