import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private shippingPrice = 0;
  public currentStage = 3;
  public cartItems = [
    {
      id: 1,
      name: 'test product',
      photo: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
      color: 'red',
      size: 'XL',
      quantity: 20,
      price: 30,
      total: 600,
    },
    {
      id: 1,
      name: 'test product',
      photo: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
      color: 'red',
      size: 'XL',
      quantity: 20,
      price: 30,
      total: 600,
    },
    {
      id: 1,
      name: 'test product',
      photo: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
      color: 'red',
      size: 'XL',
      quantity: 20,
      price: 30,
      total: 600,
    },
    {
      id: 1,
      name: 'test product',
      photo: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
      color: 'red',
      size: 'XL',
      quantity: 20,
      price: 30,
      total: 600,
    },
  ]
  
  public billingForm: FormGroup;
  public paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.billingForm = this.fb.group({})

    this.billingForm = this.fb.group({})
  }

  public calcCartTotal(){
    if(this.cartItems.length)
      return this.cartItems.reduce((p, c) => p + +c.total, 0)
    return 0;
  }

  public getTotals(){
    if(this.cartItems){
      return {total: this.calcCartTotal() + this.shippingPrice, shipping: this.shippingPrice, subtotal: this.calcCartTotal()}
    }

    return { total: 0, subtotal: 0, shipping: 0}
  }

  public moveToCheckout(){
    this.currentStage += 1
  }

  public onNext(){
    if(this.currentStage > 3) this.currentStage += 1;
  }
  public onBack(){
    if(this.currentStage > 1) this.currentStage -= 1;
  }
}
