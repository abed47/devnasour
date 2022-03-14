import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public userType: 1 | 2 = 1;
  public receiveEmailUpdates: boolean = false;
  public acceptedTerms: boolean = false;

  constructor(private fb: FormBuilder) { }

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
    console.log(this.userType)
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

}
