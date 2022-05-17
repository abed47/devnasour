import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit, OnDestroy {

  public sidenavOpen: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(private layoutUtils: LayoutUtilsService) { }

  ngOnInit(): void {
    this.loadSettings()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private loadSettings(){
    this.subscriptions.push(this.layoutUtils.getSidenavSub().subscribe(r => this.sidenavOpen = r));
  }

  public onSidenavClose(){
    this.layoutUtils.closeSideNav();
  }
}
