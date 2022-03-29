import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CountryCodeList from 'country-codes-list';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  public countryList: any = [];
  public contactF: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    //init form
    this.contactF = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      message: ['', [Validators.required]],
      company: ['', []],
      companyName: ['', []]
    });

    //add countries to the country list
    let arr = CountryCodeList.all();
    arr.splice(arr.indexOf(arr.filter(item => item.countryCode === "IL")[0]), 1);
    this.countryList = arr;
  }

}
