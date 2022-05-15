import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private layoutUtilsService: LayoutUtilsService,
    private _snackbar: MatSnackBar
    ){}

  ngOnInit(): void {
    this.subscriptions.push(this.layoutUtilsService.getPreloaderSubject().subscribe(r => this.loaderActive = r));
    this.subscriptions.push(this.layoutUtilsService.getSnackbarSubject().subscribe(r => this.handleSnackbar(r)))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private handleSnackbar(e){
    this._snackbar.open(e.message, 'Dismiss', {
      panelClass: `snackbar-${e.type}`,
      duration: 4000
    })
  }
}
