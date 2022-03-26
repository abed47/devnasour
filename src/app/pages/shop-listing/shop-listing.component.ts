import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-listing',
  templateUrl: './shop-listing.component.html',
  styleUrls: ['./shop-listing.component.scss']
})
export class ShopListingComponent implements OnInit {

  public recommendedItemList = [
    {
      id: 1,
      photo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
      name: 'item name',
      price: 145,
      rating: 2
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    for(let i = 0; i < 14; i++){
      this.recommendedItemList.push({
        ...this.recommendedItemList[0],
        id: i + 2
      })
    }

    console.log(this.recommendedItemList)
  }

}
