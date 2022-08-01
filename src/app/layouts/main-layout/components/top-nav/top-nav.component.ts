import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class TopNavComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];
  public loggedIn = false;
  public cartItemCount = 0;
  public favoriteItemCount = 0;

  constructor(
    private router: Router, 
    private layoutUtils: LayoutUtilsService,
    private auth: AuthService,
    private cartService: CartService,
    private favoriteService: FavoritesService,
  ) { }

  ngOnInit(): void {
    this.loadSettings();
    // this.auth.getAuthStatus
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
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
}
