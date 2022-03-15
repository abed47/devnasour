import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  public sidenavOpen: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private layoutUtils: LayoutUtilsService) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  private loadSettings(){
    this.subscriptions.push(this.layoutUtils.getSidenavSub().subscribe(r => this.sidenavOpen = r));
  }

  public onSidenavClose(){
    this.layoutUtils.closeSideNav();
  }

}
