import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { responseType } from '../shared/types';
@Injectable({
  providedIn: 'root'
})

export class RequestService {

  private token = '';
  private serverUrl = env.serverUrl + env.apiUrl;

  constructor(private http: HttpClient) { }

  private getToken(){}

  public getMainCategories(){
    return new Promise<responseType>((resolve, reject) => {
      this.http.get<responseType>(this.serverUrl + 'get_data.php').subscribe(r => {
        resolve(r)
      }, e => {
        reject(e)
      })
    })
  }

  public getSubCategories(id: string | number){
    return new Promise<responseType>((resolve, reject) => {
      this.http.get<responseType>(this.serverUrl + 'get_data.php?e_type=c' + `&p_id=${id}`)
      .subscribe(r => resolve(r), e => reject(e));
    })
  }

  public getCategoryProducts(id: string | number){
    return new Promise<responseType>((resolve, reject) => {
      this.http.get<responseType>(this.serverUrl + 'get_data.php?e_type=p' + `&p_id=${id}`)
      .subscribe(r => resolve(r), e => reject(e));
    })
  }

  public getProductDetails(id: string | number){
    return new Promise<responseType>((resolve, reject) => {
      this.http.get<responseType>(this.serverUrl + 'get_data.php?action=view_product' + `&product_id=${id}`)
      .subscribe(r => resolve(r), e => reject(e));
    });
  }

  public getProjects(cb: CallableFunction){
    this.http.get(this.serverUrl + 'get_data.php?e_type=pr').subscribe(res => cb(res), err => cb(null, err));
  }

  public getProject(id: string | number, cb: CallableFunction){
    this.http.get(this.serverUrl + 'get_data.php?action=view_project&project_id=' + id).subscribe(res => cb(res), err => cb(null, err))
  }

  public getMetaData(keys: string[], cb: CallableFunction){
    this.http.post(this.serverUrl + 'get_data.php', { action: 'get_metadata', keys}).subscribe(
      res => cb(res, null),
      err => cb(null, err)
    )
  }

  /*=============================================AUTH REQUESTS=================================================*/
  public register(body,cb: CallableFunction){
    this.http.post(this.serverUrl + 'login.php?action=register', body).subscribe(r => {
      cb(r, null)
    }, e => {
      cb(null, e)
    })
  }
  public login(body:any, cb: CallableFunction){
    this.http.post(this.serverUrl + 'login.php?action=login', body).subscribe(r => {
      cb(r, null)
    }, e => {
      cb(null, e)
    })
  }
}
