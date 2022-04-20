import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private request: RequestService,
    private layoutUtils: LayoutUtilsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm (){
    this.loginForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.min(6)]]
    });
    // this.loginForm.valueChanges.subscribe()
  }

  public onLoginSubmit(){
    console.log(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
  }

  public onFbLogin(){}

  public onGoogleLogin(){}

}
