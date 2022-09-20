import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  public sidenavOpen: boolean = false;
  private subscriptions: Subscription[] = [];
  public loggedIn = false;

  constructor(
    private layoutUtils: LayoutUtilsService,
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  private loadSettings(){
    this.subscriptions.push(this.layoutUtils.getSidenavSub().subscribe(r => this.sidenavOpen = r));
    this.subscriptions.push(this.auth.AuthStatusSubject.subscribe((r: any) => {
      this.loggedIn = r}));

    this.loggedIn = this.auth.getAuthStatus().loggedIn;
  }

  public onSidenavClose(){
    this.layoutUtils.closeSideNav();
  }

  public onLogout(){
    this.auth.logout();
    this.loggedIn = false;
    this.router.navigate(['/']);
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

}
