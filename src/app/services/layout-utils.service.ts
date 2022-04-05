import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutUtilsService {

  private sidenav: Subject<any> = new Subject();
  private breadCrumbSubject: Subject<{action: 'rename' | 'change-active', value?:string, key?:string}> = new Subject();


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

  public getBreadCrumbSubject() {
    return this.breadCrumbSubject
  }

  public renamePath(n: string, key: string){
    this.breadCrumbSubject.next({action: 'rename', value: n, key})
  }

  public changeActivePath(key: string){
    this.breadCrumbSubject.next({action: 'change-active', key});
  }
}
