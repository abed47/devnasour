import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';

@Component({
  selector: 'main-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  public loggedIn = false;

  constructor(
    private router: Router, 
    private layoutUtils: LayoutUtilsService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loadSettings();
    // this.auth.getAuthStatus
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private loadSettings(){
    this.subscriptions.push(this.auth.AuthStatusSubject.subscribe((r: any) => {this.loggedIn = r}));

    this.loggedIn = this.auth.getAuthStatus()?.loggedIn || false
  }

  public moveToLogin () {
    this.router.navigate(['/login']);
  }

  public toggleSidenav(){
    this.layoutUtils.openSideNav();
  }
}
