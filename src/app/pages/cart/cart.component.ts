import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import countryCodesList from 'country-codes-list';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public countryList = [];
  public voucherCode = "";
  public voucherAccepted ="";
  private voucherValue;
  private shippingPrice = 0;
  public currentStage = 1;
  public cartItems = [
  ]
  
  public billingForm: FormGroup;
  public paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cart: CartService,
  ) { }

  ngOnInit(): void {
    this.buildSettings();
  }
  
  private buildSettings(){
    this.billingForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
      zip: ['', []],
      phone: ['', []],
      email: ['', [Validators.required, Validators.email]],
      saveAddress: [true, []]
    })

    this.paymentForm = this.fb.group({})

    let arr = countryCodesList.all();
    arr.splice(arr.indexOf(arr.filter(item => item.countryCode === "IL")[0]), 1);
    this.countryList = arr;
    
    this.getCartItems();
  }
  
  private getCartItems(){
    let cItems = this.cart.getItems();
    this.cartItems = cItems;
  }

  public removeCartItem(i){
    let c = [...this.cartItems];
    c.splice(i, 1);
    this.cart.setItems(c);
    this.getCartItems();
  }

  public calcCartTotal(){
    if(this.cartItems.length)
      return this.cartItems.reduce((p, c) => p + +c.price, 0)
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

  public onApplyVoucher(){}

  public onNext(){
    if(this.currentStage === 2){
      if (this.billingForm.invalid) return;
    }
    if(this.currentStage < 3) this.currentStage += 1;
  }

  public onBack(){
    if(this.currentStage > 1) this.currentStage -= 1;
  }

  public confirmPayment(){
    
  }
}
