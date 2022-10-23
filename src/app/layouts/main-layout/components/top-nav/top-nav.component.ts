import { isPlatformBrowser } from '@angular/common';
import { AfterViewChecked, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';

@Component({
  selector: 'main-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy, AfterViewChecked{

  private subscriptions: Subscription[] = [];
  public loggedIn = false;
  public cartItemCount = 0;
  public favoriteItemCount = 0;
  public megaMenuOpen = false

  constructor(
    private router: Router, 
    private layoutUtils: LayoutUtilsService,
    private auth: AuthService,
    private cartService: CartService,
    private favoriteService: FavoritesService,
  ) { }

  ngAfterViewChecked(): void {
  }

  ngOnInit(): void {
    this.loadSettings();
    // this.auth.getAuthStatus
    // if(window && window?.addEventListener) {
    //   //@ts-ignore
    //   window.addEventListener("click", (e) => this.handleOutsideClick(e))
    // }
  }

  

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    // if(window && window?.removeEventListener) {
    //   //@ts-ignore
    //   window.removeEventListener("click", (e) => this.handleOutsideClick(e));
    // }
  }

  private loadSettings(){
    this.subscriptions.push(this.auth.AuthStatusSubject.subscribe((r: any) => {
      this.loggedIn = r
    }));
    this.subscriptions.push(this.layoutUtils.getCartChangeObservable().subscribe((r: any) => {
      this.checkForCartItemCount();
      this.checkFavoriteItemCount();
    }))
    this.loggedIn = this.auth.getAuthStatus()?.loggedIn || false
  }

  public moveToLogin () {
    this.router.navigate(['/login']);
    if(window){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  public toggleSidenav(){
    this.layoutUtils.openSideNav();
  }

  public checkForCartItemCount() {
    const items = this.cartService.getItems();
    if (items?.length) {
      return this.cartItemCount = items.length;
    }
    this.cartItemCount = 0;
  }

  public checkFavoriteItemCount() {
    const items = this.favoriteService.getItems();
    if (items?.length) {
      return this.favoriteItemCount = items.length;
    }
    this.favoriteItemCount = 0;
  }

  public menuToggle() {
    this.megaMenuOpen = !this.megaMenuOpen
  }

  public handleOutsideClick (e) {
    if (e.target.offsetParent.id == "menuToggler") return;
    this.megaMenuOpen = false;
  }
}
