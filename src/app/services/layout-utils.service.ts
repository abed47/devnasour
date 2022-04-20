import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutUtilsService {

  //snackbar options
  public snackbarType = "success";
  public snackbarMessage = "";

  private sidenav: Subject<any> = new Subject();
  private breadCrumbSubject: Subject<{action: 'rename' | 'change-active', value?:string, key?:string}> = new Subject();
  private loader: Subject<any> = new Subject();
  private snackbar: Subject<any> = new Subject();


  constructor() { }

  public showSnack(type: "error" | "success" | "info" | "warn", message: string, action?: any, hide?: boolean){
    this.snackbar.next({type, message, action, hide});
  }

  public hideSnack(){
    this.snackbar.next({hide: true})
  }

  public getSnackbarSubject(){
    return this.snackbar
  }

  public showLoader(){
    this.loader.next(true);
  }

  public hidePreloader(){
    this.loader.next(false);
  }

  public getPreloaderSubject(){
    return this.loader
  }

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
