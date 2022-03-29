import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.scss']
})
export class ShopLayoutComponent implements OnInit, OnDestroy {

  public subscriptions: any[];
  public activeIndex = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private loadSettings(){  
      this.handleCurrentRoute();
      let ss = [];
      ss.push(this.router.events.subscribe(e => this.handleCurrentRoute(e)));
      this.subscriptions = [...ss];
  }

  private handleCurrentRoute = (r?: any) => {
    if(this.router.url === '/shop') this.activeIndex = 0;
    if(this.router.url === '/shop/trending') this.activeIndex = 2;
    if(this.router.url === '/shop/deals') this.activeIndex = 3;
  }

}
