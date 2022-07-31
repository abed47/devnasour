import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'user-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy {

  public sideNavOpen = true;
  public currentUser: any = {}
  private subscriptions: Subscription[] = [];
  constructor(
    private auth: AuthService,
    private store: StoreService,
    private layoutUtils: LayoutUtilsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private loadSettings(){
    this.currentUser = this.auth.getAuthStatus().currentUser;
    this.subscriptions.push(this.layoutUtils.getSidenavSub().subscribe(r => this.sideNavOpen = r))
  }

  public onSidenavToggle(){
    if (this.sideNavOpen) return this.layoutUtils.closeSideNav()
    this.layoutUtils.openSideNav();
  }

  public onLogout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  public onGoHome(){
    this.router.navigate(['/home'])
  }

}
