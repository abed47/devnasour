import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-dimentional-listing',
  templateUrl: './three-dimentional-listing.component.html',
  styleUrls: ['./three-dimentional-listing.component.scss']
})
export class ThreeDimentionalListingComponent implements OnInit {

  productList = [];

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    for (let i = 0; i < 26; i++) {
      this.productList.push({
        name: "test Product " + i,
        rating: 3,
        price: 25,
        photo: "assets/images/box-image.png",
        id: 1
      })
    }
  }

}
