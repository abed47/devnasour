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

  public getMetaData(keys: string[], key: string | null, cb: CallableFunction){
    if(key !== null && key !== undefined){
      this.http.post(this.serverUrl + 'get_data.php', { action: 'get_metadata', key}).subscribe(
        res => cb(res, null),
        err => cb(null, err)
      )
      return
    }
    this.http.post(this.serverUrl + 'get_data.php', { action: 'get_metadata', keys}).subscribe(
      res => cb(res, null),
      err => cb(null, err)
    )
  }

  public getMetaDataSub(keys: string[], key: string | null){
    if(key !== null && key !== undefined) return this.http.post<responseType>(this.serverUrl + 'get_data.php', { action: 'get_metadata', key});
    return this.http.post<responseType>(this.serverUrl + 'get_data.php', { action: 'get_metadata', keys});
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

  /*=============================================USER REQUESTS=================================================*/
  public getOrders(body: { action: string, limit: number, offset: number, web_user_id: any, web_order_status_id: string, web_product_name: string, search_date: string}, cb: CallableFunction){
    this.http.post(this.serverUrl + 'order.php', body).subscribe(r => cb(r, null), e => cb(null, e));
  }

  public createOrder(body: any, cb: CallableFunction){
    this.http.post(this.serverUrl + 'order.php', body).subscribe(r => cb(r, null), e => cb(null, e));
  }

  public getAddresses(body: { action: string, limit: number, offset: number, web_user_id: any}, cb: CallableFunction){
    this.http.post(this.serverUrl + 'actions.php', body).subscribe(r => cb(r, null), e => cb(null, e));
  }

  public createAddress(body: { action: string, web_user_id: string | number, city: string, address_name: string, zip: string | number, province: string, country: string, first_name: string, last_name: string, email: string, phone: string | number}, cb: CallableFunction){
    this.http.post(this.serverUrl + 'actions.php', body).subscribe(r => cb(r, null), e => cb(null, e));
  }

  public getOrderStatusEnum(){
    return this.http.post(this.serverUrl + 'order.php', { action: 'get_order_status' }).toPromise();
  }
}
