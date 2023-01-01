import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mockups-listing',
  templateUrl: './mockups-listing.component.html',
  styleUrls: ['./mockups-listing.component.scss']
})
export class MockupsListingComponent implements OnInit {

  productList = [];

  constructor(
    private router: Router,
  ) { }

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


  public onMoveToPage(item: any){
    console.log(item);
    this.router.navigate([`/shop/mockup/${item.id}/${item.name}`]);
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

}
