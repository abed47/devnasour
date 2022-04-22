import { Injectable } from '@angular/core';
import { StorageTypes } from '../shared/types';



@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private isObject (v: string) {
    let t1 = v?.match(/\{.*\}/ig);
    if(t1?.length) return true;
    let t2 = v?.match(/\[.*\]/ig);
    if(t2?.length) return true;
    return false;
  }

  private getStorage  (type: StorageTypes){
    if(type === StorageTypes.LOCAL_STORAGE) return localStorage;
    if(type === StorageTypes.SESSION_STORAGE) return sessionStorage;
    return localStorage;
  }

  public setItem (key, value, type: StorageTypes = StorageTypes.LOCAL_STORAGE) {
    let storage = this.getStorage(type);
    storage.setItem(key, JSON.stringify(value));
  }

  public getItem (key, type: StorageTypes = StorageTypes.SESSION_STORAGE){
    let storage = this.getStorage(type);
    let v = storage.getItem(key);
    if(typeof v === undefined || typeof v === null) return null;
    if(this.isObject(v)) return JSON.parse(v);
    return v;
  }
}
