import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import countryCodesList from 'country-codes-list';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.scss']
})
export class ViewAddressComponent implements OnInit {

  public processing: boolean = false;
  public billingForm: FormGroup;
  public countryList = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private request: RequestService,
    private auth: AuthService,
    private layoutUtils: LayoutUtilsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildSettings();
  }

  private async buildSettings(){


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
      // saveAddress: [true, []]
    })

    let arr = countryCodesList.all();
    arr.splice(arr.indexOf(arr.filter(item => item.countryCode === "IL")[0]), 1);
    this.countryList = arr;


    this.layoutUtils.showLoader();

    this.request.getAddresses({
      limit: 20,
      action: 'get_user_address',
      offset: 0,
      web_user_id: this.auth.getAuthStatus().currentUser.web_user_id,
    }, (res, err) => {
      if(res && res.status === 1){
        let addrs = res.data.map(i => {
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
            address: i.web_user_address_name
          }
        })

        let currentAddress = addrs.filter(i => i.addressId == this.route.snapshot.params.id)?.[0];
        this.billingForm.setValue({
          firstName: currentAddress.firstName,
          lastName: currentAddress.lastName,
          address: currentAddress.address,
          city: currentAddress.city,
          country: currentAddress.country,
          province: currentAddress.province,
          zip: currentAddress.zip,
          phone: currentAddress.phone,
          email: currentAddress.email,
          // saveAddress: currentAddress.saveAddress,
        })
        this.layoutUtils.hidePreloader();
      }
    })
  }

  public onSubmit(){
    if(this.billingForm.valid){
      this.processing = true;
      let formValue = this.billingForm.value;
      this.request.createAddress({
        first_name: formValue.firstName,
        last_name: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        city: formValue.city,
        address_name: formValue.address,
        country: formValue.country,
        zip: formValue.zip,
        web_user_id: this.auth.getAuthStatus().currentUser.web_user_id,
        action: 'add_user_address',
        province: formValue.province,
      }, (res, err) => {
        this.processing = false;
        if(err){
          this.layoutUtils.showSnack("error", err?.message || "server error");
          return;
        }

        if(res){
          this.layoutUtils.showSnack("success", "Created successfully");
          this.router.navigate(['/user/addresses']);
          if(window){
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }
        }
      })
    }
  }

  public onCancel(){
    this.router.navigate(['/user/addresses']);
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

}
