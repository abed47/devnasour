import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss']
})
export class OrderListingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'location', 'status', 'actions', 'options'];
  private data = [];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Pagination options
  public itemsPerPage = 5;
  public currentPage = 0;
  public totalRows = 0;

  constructor(
    private request: RequestService,
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
    this.loadData();

    // this.paginator.pageSizeOptions
  }

  private loadData(){
    this.request.getOrders({
      limit: this.itemsPerPage,
      action: 'get_order',
      offset: this.currentPage,
      web_user_id: 8
    }, (res, err) => {
      console.log("response: ", res);
      console.log("error: ", err);

      if(res && res.status === 1){
        this.data = res.data.map(i => {
          return {
            id: "#" + i.web_order_id,
            date: i.web_order_date,
            address: i.web_user_address_name,
            status: i.web_oder_status_name,
            total: i.web_order_total
          }
        })
        this.totalRows = res.total_record;
        this.dataSource.data = this.data;
      }
    })
  }

  public getNextPage(e){
    this.currentPage = e.pageIndex;
    this.itemsPerPage = e.pageSize;
    this.request.getOrders({
      limit: e.pageSize,
      action: 'get_order',
      offset: e.pageIndex * e.pageSize,
      web_user_id: 8
    }, (res, err) => {
      if(res && res.status === 1){
        this.data = res.data.map(i => {
          return {
            id: "#" + i.web_order_id,
            date: i.web_order_date,
            address: i.web_user_address_name,
            status: i.web_oder_status_name,
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

}
