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
  /*=============================================SHOP REQUESTS=================================================*/
  public getSocialAuth() {
    return this.http.post(`${this.serverUrl}actions.php`, {action: 'get_login_auth'}).toPromise();
  }
  public getNewArrivals(body:any){
    return this.http.post(`${this.serverUrl}get_data.php`, body).toPromise();
  }

  public getTrendingProducts(body: any) {
    return this.http.post(`${this.serverUrl}actions.php`, body).toPromise();
  }

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

  public getProjects(offset: number, limit: number, cb: CallableFunction){
    this.http.post(this.serverUrl + `get_data.php?e_type=pr&limit=${limit}&offset=${offset}`, {}).subscribe(res => cb(res), err => cb(null, err));
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

  public getOrderDetails(id: string | number, cb: CallableFunction){
    this.http.post(this.serverUrl + 'order.php', { action: 'get_order', web_order_id: id, offset: 0, limit: 1}).subscribe(r => cb(r, null), e => cb(null, e));
  }

  public getAddresses(body: { action: string, limit: number, offset: number, web_user_id: any}, cb: CallableFunction){
    this.http.post(this.serverUrl + 'actions.php', body).subscribe(r => cb(r, null), e => cb(null, e));
  }

  public createAddress(body: { action: string, web_user_id: string | number, city: string, address_name: string, zip: string | number, province: string, country: string, first_name: string, last_name: string, email: string, phone: string | number}, cb: CallableFunction){
    this.http.post(this.serverUrl + 'actions.php', body).subscribe(r => cb(r, null), e => cb(null, e));
  }

  public editAddress(body: { action: string, web_user_id: string | number, address_id: string | number, city: string, address_name: string, zip: string | number, province: string, country: string, first_name: string, last_name: string, email: string, phone: string | number}, cb: CallableFunction){
    this.http.post(this.serverUrl + 'actions.php', body).subscribe(r => cb(r, null), e => cb(null, e));
  }

  public getOrderStatusEnum(){
    return this.http.post(this.serverUrl + 'order.php', { action: 'get_order_status' }).toPromise();
  }

  public getCategoryWithChildren(){
    return this.http.post(this.serverUrl + 'get_data.php', { action: "get_category_with_children"})
  }

  /*=============================================MOCKUP REQUESTS=================================================*/
  // [18:52, 03/01/2023] marwan taha: {"action":"get_mockup_detail","color_id","mockup_id"}
  // [18:52, 03/01/2023] marwan taha: {"action":"get_mockup","mockup_id":2}
  // [18:52, 03/01/2023] marwan taha: {"action":"get_mockup","offset":0,"limit":1}
  public getMockups(body: { offset?: number, limit?: number, action?: string,  mockup_id?: number}) {
    return this.http.post(`${this.serverUrl}actions.php`, {...body, action: "get_mockup"}).toPromise();
  }

  /*=============================================DESIGN REQUESTS=================================================*/
  public saveDesign(body: any) {
    return this.http.post(`${this.serverUrl}design.php`, body).toPromise();
  }
  public searchDesign(body: any) {
    return this.http.post(`${this.serverUrl}design.php`, body).toPromise();
  }

  public downloadFile (url, body?: any) {
    return this.http.get(url, { headers: { "Content-Type": "image/svg+xml" }}).toPromise();
  }

  public getDeals () {
    return this.http.post(`${this.serverUrl}actions.php`, {
      action: 'get_deals',
    }).toPromise();
  }

  public getCoupon(code: string) {
    return this.http.post(`${this.serverUrl}actions.php`, {
      action: 'get_coupon',
      code
    }).toPromise()
  }

  public getDashboard (webUserId) {
    return this
    .http
    .post(`${this.serverUrl}actions.php`, {
      action: "user_dashboard",
      web_user_id: webUserId
    })
    .toPromise();
  }
}
