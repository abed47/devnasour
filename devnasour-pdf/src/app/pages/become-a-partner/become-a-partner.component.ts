import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-become-a-partner',
  templateUrl: './become-a-partner.component.html',
  styleUrls: ['./become-a-partner.component.scss']
})
export class BecomeAPartnerComponent implements OnInit {

  public partnerForm: FormGroup;
  public logo: any;
  public barcode: any;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.partnerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      phone: ['', []],
      partnerShipLocation: ['', []],
      franchiseType: ['', [Validators.required]],
      howDidYouHearAboutUs: ['', []]
    })
  }

  public onSubmit(){
    let body = {}
    console.log(this.partnerForm.value);
  }
}
