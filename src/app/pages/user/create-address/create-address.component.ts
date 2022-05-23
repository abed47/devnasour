import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import countryCodesList from 'country-codes-list';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.scss']
})
export class CreateAddressComponent implements OnInit {

  public billingForm: FormGroup;
  public countryList = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
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

  public onSubmit(){}

  public onCancel(){
    this.router.navigate(['/user/addresses'])
  }
}
