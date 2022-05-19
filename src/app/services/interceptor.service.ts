import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutUtilsService } from './layout-utils.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private layoutUtilsService: LayoutUtilsService,
  ) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("request intercepted")
    this.layoutUtilsService.setIsLoading(true);

    return next.handle(req).pipe(
      finalize( () => this.layoutUtilsService.setIsLoading(false) )
    )
  }

}
