import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

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

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
    setTimeout(() => this.dataSource.paginator = this.paginator, 3000)
  }

  public formatDate(d){
    return moment(d).format("DD/MM/YYYY")
  }

}
