import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.scss']
})
export class ShopLayoutComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[];
  public activeIndex = 0;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private loadSettings(){    
    this.router.events.subscribe((res) => {
      if(this.router.url === '/shop') this.activeIndex = 0;
      if(this.router.url === '/shop/trending') this.activeIndex = 2;
    });
  }

}
