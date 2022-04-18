import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutUtilsService } from './services/layout-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'devnasour';
  private subscriptions: Subscription[] = [];
  public loaderActive: boolean = false;

  constructor(private layoutUtilsService: LayoutUtilsService){}

  ngOnInit(): void {
    this.subscriptions.push(this.layoutUtilsService.getPreloaderSubject().subscribe(r => this.loaderActive = r));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
