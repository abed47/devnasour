import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  public history = [];
  public products = [];
  public orderDetails = null;
  public orderTotal = 0;
  constructor(
    private auth: AuthService,
    private layoutUtils: LayoutUtilsService,
    private request: RequestService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    const orderId = this.route.snapshot.params.id
    this.request.getOrderDetails(orderId, (res, err) => {
      if(err || res?.status === 0){
        this.layoutUtils.showSnack("error", err?.message || res?.message || "error loading order");
        this.router.navigate(['/user/orders']);
        if(window){
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
      }

      if(res && res?.status === 1){
        this.orderDetails = res.data[0];
        this.products = res.data[0].products;
        this.history = res.data[0].event_store;
        this.orderTotal = +res.data[0].web_order_total;
      }
    })
  }

  public formatDate(d: string){
    return moment(d, 'YYYY-MM-DD hh:mm:ss').format("DD/MM/YYYY")
  }

  // private fixProductImages(){
  //   this.products.forEach((i, index) => {
  //     this.request.getProductDetails(i.web_product_id).then(r => {
  //       console.log(this.products[0].web_product_attachment_1)
  //       this.products[0].web_product_attachment_1 = r.data.web_product_attachments[0]
  //     })
  //   })
  // }

  public calcOrderTotal(){
    return this.products.reduce((p, c, i) => {
      return p + +c.web_order_product_price
    }, 0)
  }

}
