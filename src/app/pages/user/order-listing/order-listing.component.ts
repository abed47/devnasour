import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss']
})
export class OrderListingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'location', 'amount', 'status', 'actions'];
  private data = [];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Pagination options
  public itemsPerPage = 5;
  public currentPage = 0;
  public totalRows = 0;
  public statusFilter = 'all';
  public statusNameList = [];
  public processing = false;
  private userId = null;
  public textFilter = "";

  constructor(
    private request: RequestService,
    private auth: AuthService,
    private layoutUtils: LayoutUtilsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
    this.userId = this.auth.getAuthStatus().currentUser.web_user_id;
    this.loadData();

    // this.paginator.pageSizeOptions
  }

  private async loadData(){
    try{
      let statusNames: any = await this.request.getOrderStatusEnum();
      this.statusNameList = statusNames.data;
      this.dataSource.data = [];
      this.processing = true;
      this.request.getOrders({
        limit: this.itemsPerPage,
        action: 'get_order',
        offset: this.currentPage,
        web_user_id: this.userId,
        web_order_status_id: this.statusFilter === "all" ? null : this.getStatusIDByName(this.statusFilter),
        web_product_name: this.getSearchByProductFilter(),
        search_date: this.getSearchByDateFilter(),
      }, (res, err) => {

        if(err){
          this.layoutUtils.showSnack("error", err?.message || "Error loading orders");
          return;
        }
        console.log(res);
        this.processing = false;
        if(res && res.status === 1){
          this.data = res.data.map(i => {
            return {
              id: i.web_order_id,
              date: i.web_order_date,
              address: i.web_user_address_name,
              status: i.web_order_status_name || "pending",
              total: i.web_order_total
            }
          })
          this.totalRows = res.total_record;
          this.dataSource.data = this.data;
        }
      })
    }catch(err){
      this.layoutUtils.showSnack("error", err?.message || "Could not load order status");
    }
  }

  public getNextPage(e){
    this.currentPage = e.pageIndex;
    this.itemsPerPage = e.pageSize;
    this.dataSource.data = [];
    this.processing = true;
    this.request.getOrders({
      limit: e.pageSize,
      action: 'get_order',
      offset: e.pageIndex * e.pageSize,
      web_user_id: this.userId,
      web_order_status_id: this.statusFilter === "all" ? null : this.getStatusIDByName(this.statusFilter),
      web_product_name: this.getSearchByProductFilter(),
      search_date: this.getSearchByDateFilter(),
    }, (res, err) => {
      this.processing = true;
      if(res && res.status === 1){
        this.data = res.data.map(i => {
          return {
            id: "#" + i.web_order_id,
            date: i.web_order_date,
            address: i.web_user_address_name,
            status: i.web_order_status_name || "pending",
            total: i.web_order_total
          }
        })
        this.dataSource.data = this.data;
        this.totalRows = res.total_record;
      }
    })
  }

  public formatDate(d){
    return moment(d).format("DD/MM/YYYY")
  }

  public onFilterChange(s: string){
    this.statusFilter = s;
    this.currentPage = 0;
    this.itemsPerPage = 5;
    this.loadData()
  }

  public getStatusName(s: string){
    switch(s){
      case 'pending':
        return 'Pending';
      case 'on_the_way':
        return 'On The Way';
      case 'delivered':
        return 'Delivered';
      case 'canceled':
        return 'Canceled';
      default:
        return 'Pending';
    }
  }

  private getStatusIDByName(name: string){
    return this.statusNameList.filter(v => v.web_order_status_name === name)[0].web_order_status_id;
  }

  private getStatusNameByID(id){
    return this.statusNameList.filter(v => v.web_order_status_id === id)[0].web_order_status_name;
  }

  private getSearchByDateFilter(){
    let date = moment(this.textFilter, 'DD/MM/YYYY');
    if(date.isValid()) return date.format('YYYY-MM-DD');
    return null;
  }

  private getSearchByProductFilter(){
    let date = moment(this.textFilter, 'DD/MM/YYYY');
    if(!date.isValid() && this.textFilter) return this.textFilter;
    return null;
  }

  public handleClearFilter(){
    this.textFilter = '';
    this.currentPage = 0;
    this.itemsPerPage = 5;
    this.loadData();
  }

  public handleFilterKeyUp(e){
    if(e.key === "Enter"){
      this.currentPage = 0;
      this.itemsPerPage = 5;
      this.loadData();
    }
  }

  public onViewOrder(id){
    this.router.navigate([`/user/orders/${id}`])
  }
}
