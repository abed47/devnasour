import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { phone } from "phone";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public selectedPhoneCountry = "tr";
  public registerForm: FormGroup;
  public userType: 1 | 2 = 1;
  public receiveEmailUpdates: boolean = false;
  public acceptedTerms: boolean = false;

  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private layoutUtils: LayoutUtilsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      passwordConfirm: ['', [Validators.required]],
      phone: ['', []]
    })
  }

  onSubmit(){
    let controls = this.registerForm.controls;

    if(!this.acceptedTerms){
      this.layoutUtils.showSnack('error', 'You must accept the terms of use');
      return;
    }

    let body = {
      user_type: this.userType,
      first_name: controls.firstName.value,
      last_name: controls.lastName.value,
      email: controls.email.value,
      password: controls.password.value,
      phone: controls.password.value,
      action: 'register'
    }

    if(!body.last_name || !body.last_name || !body.email || !body.password) return this.layoutUtils.showSnack('error', 'Missing required fields');

    if(controls.password.value !== controls.passwordConfirm.value) return this.layoutUtils.showSnack('error', 'Password confirmation failed!');

    let formData = new FormData();
    formData.append('first_name', body.first_name);
    formData.append('last_name', body.last_name);
    formData.append('email', body.email);
    formData.append('password', body.password);
    formData.append('action', 'register');

    this.request.register(formData, (res, err) => {
      if(res && res.status === 1){
        this.router.navigate(['/login']);
        if(window){
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
        return;
      }
      
      if(res && res?.message){
        this.layoutUtils.showSnack(res.type, res.message)
      }
    })
  }

  onUserTypeChange(e:MatCheckboxChange, t: 1 | 2){
    if(e.checked === false) e.source.checked = true;
    // if(e.checked === false) e.source.preventDefault();
    this.userType = t;
  }

  onTermsAcceptanceChange(){
    this.acceptedTerms = !this.acceptedTerms;
  }

  onReceiveEmailChange(){
    this.receiveEmailUpdates = !this.receiveEmailUpdates
  }

  public telInputObject(e) {
    console.log("value: ", e)
  }

  public onCountryChange (e) {
    console.log("country: ", e);
    this.selectedPhoneCountry = e.iso2;
  }

  public hasError(e) {
    console.log("error: ",e);
    console.log(this.registerForm.controls.phone.value);
    const { isValid } = phone(this.registerForm.controls.phone.value, { country: this.selectedPhoneCountry })
    if (!isValid) {
      this.registerForm.controls.phone.setErrors(["phone number not valid"])
    }
    // this.
    
  }
}
