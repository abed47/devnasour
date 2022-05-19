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
  private data = [
    {
    id: "324",
    date: new Date(),
    address: "saida",
    status: "satida",
    total: 20
    },
    {
    id: "324",
    date: new Date(),
    address: "saida",
    status: "satida",
    total: 20
    },
    {
    id: "324",
    date: new Date(),
    address: "saida",
    status: "satida",
    total: 20
    },
    {
    id: "324",
    date: new Date(),
    address: "saida",
    status: "satida",
    total: 20
    },
    {
    id: "324",
    date: new Date(),
    address: "saida",
    status: "satida",
    total: 20
    },
    {
    id: "324",
    date: new Date(),
    address: "saida",
    status: "satida",
    total: 20
    },
];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private request: RequestService,
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
    this.loadData();
  }

  private loadData(){
    this.request.getOrders({
      limit: 10,
      action: 'get_order',
      offset: 0,
      web_user_id: 8
    }, (res, err) => {
      console.log("response: ", res);
      console.log("error: ", err);
    })
  }

  public formatDate(d){
    return moment(d).format("DD/MM/YYYY")
  }

}
