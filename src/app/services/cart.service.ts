import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private store: StoreService
  ) { }

  public addItem(){}
  public removeItem(){}
  public clear(){}
  public getItems(){}
  public setItems(){}
}
