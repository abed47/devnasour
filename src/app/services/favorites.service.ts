import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(
    private store: StoreService
  ) { }

  public addItem(item){
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
