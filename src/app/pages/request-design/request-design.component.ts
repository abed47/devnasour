import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-design',
  templateUrl: './request-design.component.html',
  styleUrls: ['./request-design.component.scss']
})
export class RequestDesignComponent implements OnInit {

  public designForm: FormGroup;
  public logo: any;
  public barcode: any;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.designForm = this.fb.group({
      phone: ['', []],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', []],
      designType: ['', []],
      designContent: ['', []],
      companyWebsite: [, []],
    })
  }


  public onBarcodeChange(event){
    console.log(event);
  }

  public onLogoChange(event){
    console.log(event);
  }

  public onSubmit(){
    let body = {}

  }
}
