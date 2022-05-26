import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      }

      if(res && res?.status === 1){
        this.orderDetails = res.data;
        this.products = res.data.products;
        this.history = res.data.event_store;
      }
    })
  }

}
