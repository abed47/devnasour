import { Component, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';

@Component({
  selector: 'main-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, OnDestroy{


  constructor(private router: Router, private layoutUtils: LayoutUtilsService) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
  }

  private loadSettings(){
  }

  public moveToLogin () {
    this.router.navigate(['/login']);
  }

  public toggleSidenav(){
    this.layoutUtils.openSideNav();
  }
}
