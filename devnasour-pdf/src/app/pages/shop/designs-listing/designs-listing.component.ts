import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-designs-listing',
  templateUrl: './designs-listing.component.html',
  styleUrls: ['./designs-listing.component.scss']
})
export class DesignsListingComponent implements OnInit {

  productList = [];

  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    for (let i = 0; i < 26; i++) {
      this.productList.push({
        name: "test Prodsadfasfasfasfasfsafdasfasfasfasdfsadfasdfuct " + i,
        rating: 3,
        price: 25,
        photo: "assets/images/box-image.png",
        id: 1
      })
    }
  }

}
