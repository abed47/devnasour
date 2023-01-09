import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import countryCodesList from 'country-codes-list';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { phone } from "phone";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public promoId = null;
  public promoPercentage = 0;

  public selectedPhoneCountry = "tr";
  public countryList = [];
  public voucherCode = "";
  public voucherAccepted ="";
  private voucherValue;
  private shippingPrice = 0;
  public currentStage = 1;
  public addressId = -1;
  public cartItems = [
  ]
  public addresses = [];
  public processing = false;

  public billingForm: FormGroup;
  public paymentForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private cart: CartService,
    private request: RequestService,
    private auth: AuthService,
    private layoutUtils: LayoutUtilsService,
    private router: Router,
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
      phone: ['', [Validators.required, Validators.pattern(/[0-9]/ig)]],
      email: ['', [Validators.required, Validators.email]],
      saveAddress: [true, []]
    })

    this.paymentForm = this.fb.group({})

    let arr = countryCodesList.all();
    arr.splice(arr.indexOf(arr.filter(item => item.countryCode === "IL")[0]), 1);
    this.countryList = arr;

    this.getCartItems();

    this.request.getAddresses({
      limit: 20,
      action: 'get_user_address',
      offset: 0,
      web_user_id: this.auth.getAuthStatus().currentUser.web_user_id,
    }, (res, err) => {
      if(res && res.status === 1){
        this.addresses = res.data.map(i => {
          return {
            city: i.web_user_address_city,
            country: i.web_user_address_country,
            email: i.web_user_address_email,
            firstName: i.web_user_address_first_name,
            addressId: i.web_user_address_id,
            lastName: i.web_user_address_last_name,
            addressName: i.web_user_address_name,
            phone: i.web_user_address_phone,
            province: i.web_user_address_province,
            zip: i.web_user_address_zip,
            id: i.web_user_address_id,
            name: i.web_user_address_title,
            address: i.web_user_address_name,
            voucher_code: this.promoId,
          }
        })
      }
    })
  }

  private getCartItems(){
    let cItems = this.cart.getItems();
    this.cartItems = cItems || [];
  }

  public removeCartItem(i){
    let c = [...this.cartItems];
    c.splice(i, 1);
    this.cart.setItems(c);
    this.getCartItems();
    this.layoutUtils.checkCartItemChange();
  }

  public calcCartTotal(){
    if(this.cartItems.length){
      return this.cartItems.reduce((p, c) => p + +c.price, 0)
    }
    return 0;
  }


  public getTotals(){
    if(this.cartItems){
      let total = this.calcCartTotal() + this.shippingPrice;
      let shipping = this.shippingPrice;
      let subtotal = this.calcCartTotal();
      let discountAmount = ((total / 100) * this.promoPercentage) || 0;
      total -= discountAmount
      return {
        total, 
        shipping, 
        subtotal,
        discountAmount
      }
    }

    return { total: 0, subtotal: 0, shipping: 0}
  }

  public moveToCheckout(){
    this.currentStage += 1
  }

  public onApplyVoucher(){}

  public onNext(){
    if(this.currentStage === 1 && this.cartItems?.length < 1) return;
    if(this.currentStage === 2){
      if (this.billingForm.invalid) return;
    }
    if(this.currentStage < 3) this.currentStage += 1;
  }

  public onBack(){
    if(this.currentStage > 1) this.currentStage -= 1;
  }

  /**
   * @description - Format Array of cart products to create order from
   */
  private getProductsForOrder(){
    return this.cart.getItems().map(i => {
      return {
        id: i.id,
        quantity: i.quantity,
        price: i.price,
        discount: i.discount,
        web_product_attachment_1: i.photo,
        image: i.photo,
        photo: i.photo,
        web_product_color_id: i?.color || 0,
        type: i?.type || "PRODUCT",
        files: i.files
      }
    })
  }

  /**
   * @description - Handle Success (empty cart, move to user dashboard)
   */
  public handleOrderCreated(){
    //TODO: show success message instead of plain snackbar
    this.layoutUtils.showSnack("success", "Order created");
    this.cart.clear();
    this.router.navigate(['/user/orders']);
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  public confirmPayment(){
    let purchaseBody = {
      action: "set_order",
      web_user_id: this.auth.getAuthStatus().currentUser.web_user_id,
      total: this.getTotals().total,
      voucher_code: this.voucherCode,
      address_id: this.addressId === -1 ? "" : this.addressId,
      address: {
        name: this.getBillingDetailsValue("address"),
        country: this.getBillingDetailsValue("country"),
        city: this.getBillingDetailsValue("city"),
        zip: this.getBillingDetailsValue("zip"),
        phone: this.getBillingDetailsValue("phone"),
        email: this.getBillingDetailsValue("email"),
        province: this.getBillingDetailsValue("province"),
        first_name: this.getBillingDetailsValue("firstName"),
        last_name: this.getBillingDetailsValue("lastName"),
      },
      product: this.getProductsForOrder()
    };

    this.processing = true;
    this.request.createOrder(purchaseBody, (res, err) => {
      this.processing = false;
      if(err || res?.status === 0){
        this.layoutUtils.showSnack("error", err?.message || res.message || "Server Error");
        return;
      }

      if(res.status === 1) this.handleOrderCreated();
    })
  }

  public getBillingDetailsValue(v: string) {
    return this.billingForm.controls[v].value || "";
  }

  public getNumber(e) {
    console.log("get number: ", e);
    return undefined
  }

  public hasError(e) {
    console.log("error: ",e);
    console.log(this.billingForm.controls.phone.value);
    const { isValid } = phone(this.billingForm.controls.phone.value, { country: this.selectedPhoneCountry })
    if (!isValid) {
      this.billingForm.controls.phone.setErrors(["phone number not valid"])
    }
    // this.
    
  }

  public telInputObject(e) {
    console.log("value: ", e)
  }

  public onCountryChange (e) {
    console.log("country: ", e);
    this.selectedPhoneCountry = e.iso2;
  }

  public handleAddressChange(e) {
    console.log(e, this.addresses);
    const controls = this.billingForm.controls;
    controls.saveAddress.setValue(true);
    if (e > 0) {
      controls.saveAddress.setValue(false);
      let address = this.addresses.filter(i => i.addressId == e)?.[0];
      
      if (address) {
        controls.firstName.setValue(address.firstName)
        controls.lastName.setValue(address.lastName)
        controls.address.setValue(address.addressName)
        controls.city.setValue(address.city)
        controls.country.setValue(address.country)
        controls.province.setValue(address.province)
        controls.zip.setValue(address.zip)
        controls.phone.setValue(address.phone)
        controls.email.setValue(address.email)
      }
      return;
    }
    this.billingForm.reset();
  }

  public handleItemQuantityChange(item, e, i) {
    let p = item.quantities.filter(pr => pr.quantity == e.value);
    let oldCart = this.cart.getItems();
    oldCart[i].quantity = p[0].quantity;
    oldCart[i].price = p[0].price;
    this.cart.clear();
    this.cart.setItems(oldCart);
    this.cartItems = oldCart;
  }

  //3QACPM8P0

  public async handleGetCoupon() {
    try {
      this.processing = true;
      const res: any = await this.request.getCoupon(this.voucherCode);
      
      if (res?.status === 0) {
        this.layoutUtils.showSnack("error", res?.message);
      }

      if (res?.status === 1) {
        let data = res.data;
        this.promoId = data.web_coupon_id;
        this.promoPercentage = +data.web_coupon_discount;
        this.layoutUtils.showSnack("success", "Promo code added");
      }
      this.processing = false;
    } catch (err) {
      this.layoutUtils.showSnack("error", err?.message || "Cannot add")
      this.processing = false;
      this.voucherCode = "";
      this.promoId = null;
    }
  }
}
