import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
})
export class DownloadsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'options'];
  private data = [];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //Pagination options
  public itemsPerPage = 5;
  public currentPage = 0;
  public totalRows = 0;
  public statusFilter = 'all';
  public processing = false;
  private userId = null;

  constructor(
    private request: RequestService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.data;
    this.userId = this.auth.getAuthStatus().currentUser.web_user_id;
    this.loadData();

    // this.paginator.pageSizeOptions
  }

  private loadData() {
    this.dataSource.data = [];
    this.processing = true;
    this.request.getAddresses(
      {
        limit: this.itemsPerPage,
        action: 'get_design',
        offset: this.currentPage,
        web_user_id: this.userId,
      },
      (res, err) => {
        this.processing = false;
        if (res && res.status === 1) {
          this.data = res.data.map((i) => {
            return {
              id: i.web_user_address_id,
              name: i.web_user_address_title,
              address: i.web_user_address_name,
            };
          });
          this.totalRows = res.total_record;
          this.dataSource.data = this.data;
        }
      }
    );
  }

  public getNextPage(e) {
    this.currentPage = e.pageIndex;
    this.itemsPerPage = e.pageSize;
    this.dataSource.data = [];
    this.processing = true;
    this.request.getAddresses(
      {
        limit: e.pageSize,
        action: 'get_design',
        offset: e.pageIndex * e.pageSize,
        web_user_id: this.userId,
      },
      (res, err) => {
        this.processing = true;
        if (res && res.status === 1) {
          this.data = res.data.map((i) => {
            return {
              id: i.web_user_address_id,
              name: i.web_user_address_title,
              address: i.web_user_address_name,
            };
          });
          this.dataSource.data = this.data;
          this.totalRows = res.total_record;
        }
      }
    );
  }

  public formatDate(d) {
    return moment(d).format('DD/MM/YYYY');
  }

  public onFilterChange(s: string) {
    //'all', 'on-delivery', 'delivered', 'canceled'
    this.statusFilter = s;
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.loadData();
  }
}
