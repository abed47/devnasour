import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import countryCodesList from 'country-codes-list';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit {

  public processing: boolean = false;
  public billingForm: FormGroup;
  public countryList = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private request: RequestService,
    private auth: AuthService,
    private layoutUtils: LayoutUtilsService,
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

    let arr = countryCodesList.all();
    arr.splice(arr.indexOf(arr.filter(item => item.countryCode === "IL")[0]), 1);
    this.countryList = arr;
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
