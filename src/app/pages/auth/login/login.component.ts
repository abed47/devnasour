import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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

export class LoginComponent implements OnInit, AfterViewChecked {

  loginForm: FormGroup;
  @ViewChild('loginFormEl') private loginFormEl: ElementRef<HTMLFormElement>;
  @ViewChild('innerWrapper') private innerWrapper: ElementRef<HTMLDivElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private request: RequestService,
    private layoutUtils: LayoutUtilsService,
    private auth: AuthService
  ) { }

  ngAfterViewChecked(): void {
    this.innerWrapper.nativeElement.style.height = this.loginFormEl.nativeElement.clientHeight + 'px';
    // throw new Error('Method not implemented.');
  }

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

  public onMessage: (this: Window, ev: MessageEvent<any>) => any | undefined;
  targett: Window | undefined;

  public openSocial(type: string) {
    const googleLink = "https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=online&client_id=834815781970-044in4uj74phpfi7cmm9ep78jtar4eg5.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fwww.chillyvilly.com%2Fapi%2Fgoogle_login%2Flogin_google.php&state&scope=email%20profile&approval_prompt=auto";
    const appleLink = "";
    const facebookLink = "";
    let url: string;
    if (type === 'google') url = googleLink;
    if (type === 'apple') url = appleLink;
    if (type === 'facebook') url = facebookLink;

    const target = window.open(url, '', 'width=400px, height=500px');
    if(!target) return;

    window.removeEventListener('message', this.onMessage);
    this.targett?.close;

    this.onMessage = (e: MessageEvent) => {
      let d = e.data;
      let socialLoginResp = JSON.parse(d['token']);
      target.close();
      if(socialLoginResp?.type === "success") {
        console.log(socialLoginResp);
        this.layoutUtils.showSnack("success", "Welcome back");
        
      }else if (socialLoginResp?.type === "error"){
        this.layoutUtils.showSnack("error", socialLoginResp?.message);
      }
      window.removeEventListener("message", this.onMessage);
    }
    window.addEventListener("message", this.onMessage);
    this.targett = target;
  }

}
