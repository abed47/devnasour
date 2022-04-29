import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';
import { StorageTypes } from 'src/app/shared/types';

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
    private layoutUtils: LayoutUtilsService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm (){
    this.loginForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.min(6)]],
      stayLoggedIn: [false, []]
    });
    // this.loginForm.valueChanges.subscribe()
  }

  public onLoginSubmit(){
    let controls = this.loginForm.controls;
    if(controls?.email?.value?.length < 1 || controls.password?.value?.length < 6) return this.layoutUtils.showSnack('error','Fill out all fields');
    if(controls.email.errors?.email === true) return this.layoutUtils.showSnack('error', 'email not valid');

    let fData = new FormData();
    fData.append('action', 'login');
    fData.append('email', controls.email.value);
    fData.append('password', controls.password.value);

    this.request.login(fData, (res, err) => {
      if(res && res.status === 1){
        let stayLoggedIn = controls.stayLoggedIn.value;
        this.auth.setAuthStorage(stayLoggedIn ? StorageTypes.LOCAL_STORAGE : StorageTypes.SESSION_STORAGE);
        this.auth.handleLoginSuccess(res.data, stayLoggedIn)
        return;
      }
      if(res && res.status === 0){
        this.layoutUtils.showSnack(res.type, res.message);
      }
    })
  }

  public onFbLogin(){}

  public onGoogleLogin(){}

}
