import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutUtilsService {

  private sidenav: Subject<any> = new Subject();

  constructor() { }


  public openSideNav(){
    this.sidenav.next(true);
  }

  public closeSideNav(){
    this.sidenav.next(false);
  }

  public getSidenavSub(){
    return this.sidenav;
  }
}
