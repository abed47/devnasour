import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private store: StoreService,
    private router: Router,
    private authService: AuthService,
  ) { }

  public addItem(item){
    if (!this.authService.getAuthStatus()?.loggedIn){
       this.router.navigate(['/login'])
       return false;
    }
    let currentCart = this.store.getItem("cart", 1) || [];
    currentCart.push(item);
    this.store.setItem("cart", currentCart);
    return true;
  }

  public removeItem(){}
  
  public clear(){
    this.store.setItem("cart", [], 1);
  }

  public getItems(){
    return this.store.getItem("cart", 1);
  }

  public setItems(c){
    this.store.setItem("cart", c, 1)
  }
}
