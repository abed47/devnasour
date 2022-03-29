import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-deals',
  templateUrl: './shop-deals.component.html',
  styleUrls: ['./shop-deals.component.scss']
})
export class ShopDealsComponent implements OnInit {

  public banners = [
    {
      background: 'https://powaysigncompany.com/wp-content/uploads/2015/10/promotional-products-1024x648.jpg',
      title: 'Best Deals For you',
      percentage: 10,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
      url: '',
      size: 1,
      order: 1
    },
    {
      background: 'https://powaysigncompany.com/wp-content/uploads/2015/10/promotional-products-1024x648.jpg',
      title: 'Best Deals For you',
      percentage: 10,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
      url: '',
      size: .5,
      order: 2
    },
    {
      background: 'https://powaysigncompany.com/wp-content/uploads/2015/10/promotional-products-1024x648.jpg',
      title: 'Best Deals For you',
      percentage: 10,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
      url: '',
      size: .5,
      order: 3
    },
    {
      background: 'https://powaysigncompany.com/wp-content/uploads/2015/10/promotional-products-1024x648.jpg',
      title: 'Best Deals For you',
      percentage: 10,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
      url: '',
      size: 1,
      order: 4
    },
    {
      background: 'https://powaysigncompany.com/wp-content/uploads/2015/10/promotional-products-1024x648.jpg',
      title: 'Best Deals For you',
      percentage: 10,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
      url: '',
      size: .75,
      order: 5
    },
    {
      background: 'https://powaysigncompany.com/wp-content/uploads/2015/10/promotional-products-1024x648.jpg',
      title: 'Best Deals For you',
      percentage: 10,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
      url: '',
      size: .25,
      order: 6
    },
  ]

  public onSaleItems = [
    {
      id: 1,
      photo: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
      name: 'item name',
      price: 145,
      rating: 2
    },
  ]

  constructor() { }

  ngOnInit(): void {

    for(let i = 1; i < 5; i++){
      this.onSaleItems.push({...this.onSaleItems[0], id: i + 1})
    }
  }

}
