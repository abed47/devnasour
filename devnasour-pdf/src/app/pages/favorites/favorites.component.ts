import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import countryCodesList from 'country-codes-list';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favoriteItems = [
  ]
  public addresses = [];
  public processing = false;
  
  public billingForm: FormGroup;
  public paymentForm: FormGroup;

  constructor(
    private layoutUtils: LayoutUtilsService,
    private favoritesService: FavoritesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildSettings();
  }
  
  private buildSettings(){
    this.getFavoriteItems();
  }
  
  private getFavoriteItems(){
    let cItems = this.favoritesService.getItems();
    this.favoriteItems = cItems || [];
  }

  public removeFavoriteItem(i){
    let c = [...this.favoriteItems];
    c.splice(i, 1);
    this.favoritesService.setItems(c);
    this.getFavoriteItems();
    this.layoutUtils.checkCartItemChange();
  }

  public navigateTo(id: number, name: string) {
    this.router.navigate([`/shop/product/${id}/${name.replace(/\ /ig, "-")}`]);
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }
}
