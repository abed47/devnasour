import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StorageTypes } from '../shared/types';
import { StoreService } from './store.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public AuthStatusSubject = new Subject();

  constructor(
    private store: StoreService,
    private router: Router
  ) { }

  public getAuthStatus(){
    let s = this?.store?.getItem('authStorage', StorageTypes.LOCAL_STORAGE) || StorageTypes.SESSION_STORAGE;
    let currentUser = this.store.getItem('currentUser', s);
    let token = this.store.getItem('token', s);
    let loggedIn = this.store.getItem('loggedIn', s);
    if(loggedIn) this.AuthStatusSubject.next(true);
    return {currentUser, token, loggedIn}
  }

  public handleLoginSuccess(t, stayLoggedIn = false){
    let s = stayLoggedIn === true ? StorageTypes.LOCAL_STORAGE : StorageTypes.SESSION_STORAGE;
    this.store.setItem('loggedIn', true, s);
    this.store.setItem('currentUser', t.user, s);
    this.store.setItem('token', 'token', s);
    this.AuthStatusSubject.next(true);
    this.router.navigate(['/home']);
  }
  
  public setAuthStorage(t: StorageTypes){
    this.store.setItem('authStorage', t);
  }

  public logout(){
    this.AuthStatusSubject.next(false);
    this.store.drain();
  }
}
