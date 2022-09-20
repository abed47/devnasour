import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private store: StoreService,
    private router: Router,
    private authService: AuthService,
  ) { }

  public addItem(item){
    if (!this.authService.getAuthStatus()?.loggedIn){
      this.router.navigate(['/login']);
      if(window){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
      return false;
   }
    if(this.isItemLinked(item)) return;
    let currentCart = this.store.getItem("favorites", 1) || [];
    currentCart.push(item);
    this.store.setItem("favorites", currentCart);
    return true;
  }

  public removeItem(item){
    const itemList: any[] = this.store.getItem("favorites", 1);
    if(!itemList || !itemList?.length) return false;
    itemList.forEach((product, index) => {
      if(product.web_product_id === item.web_product_id) {
        itemList.splice(index, 1);
      }
    })
    this.store.setItem("favorites", itemList, 1);
  }
  
  public clear(){
    this.store.setItem("favorites", [], 1);
  }

  public getItems(){
    return this.store.getItem("favorites", 1);
  }

  public setItems(c){
    this.store.setItem("favorites", c, 1)
  }

  public isItemLinked(item) {
    const itemList: any[] = this.store.getItem("favorites", 1);
    if(!itemList) return false;
    const filtered = itemList.filter(i => i.web_product_id === item.web_product_id);
    if(filtered?.length) return true;
    return false;
  }
}
