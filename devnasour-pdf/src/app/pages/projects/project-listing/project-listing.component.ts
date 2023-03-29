import { Component, OnInit } from '@angular/core';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.scss']
})
export class ProjectListingComponent implements OnInit {

  public itemList = [];
  public totalRows = 10;
  public currentPage = 0;
  public processing = true;

  constructor(
    private request: RequestService,
    private layoutUtils: LayoutUtilsService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(){

    this.layoutUtils.showLoader();
    this.itemList = [];

    this.request.getProjects(9 * this.currentPage, 9, (res, err) => {
      this.layoutUtils.hidePreloader();
      if(res && res.status === 1){
        this.totalRows = res?.total_record || 0;
        if(res.data?.length) this.itemList = res.data.map(item => {
          return {
            id: item.web_project_id,
            description: item.web_project_description,
            photo: item.attachments?.[0] || '',
            title: item.web_project_name
          }
        })
        return
      }

      this.totalRows = res?.total_record || 0;
      if(res?.status === 0){
        this.layoutUtils.showSnack(res.type, res.message);
        return;
      }
      if(err){}
    })
  }

  // private loadPages()


  onPageEvent(e){
    this.currentPage = e.pageIndex;
    this.loadData();
  }

}
