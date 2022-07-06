import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { ImageItem } from 'ng-gallery';
import { RequestService } from 'src/app/services/request.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    private request: RequestService,
    private router: Router
  ) { }

  public project = {
    images: [],
    name: '',
    rating: 0,
    description: '',
    models: []
  };

  public relatedProjects = [];

  ngOnInit(): void {
    this.relatedProjects = [];
    this.route.params.subscribe(r => { this.loadData() });
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  private loadData() {
    let pId = this.route.snapshot.params.id;

    this.layoutUtilsService.showLoader();

    this.request.getProject(pId, (res, err) => {
      this.layoutUtilsService.hidePreloader();
      if (res) {
        if (res?.status === 1) {
          this.project.name = res.data.web_project_name;
          this.project.description = res.data.web_project_description;
          this.project.images = res.data.attachments?.map(i => new ImageItem({ src: i, thumb: i })) || []
          this.project.models = res.data.project_models;
          this.relatedProjects = [];
          res.data.related_project?.forEach((i, index) => {
            if (index < 3) {
              this.relatedProjects.push(
                {
                  title: i.web_project_name,
                  description: i.web_project_description,
                  id: i.web_project_id,
                  photo: i.attachments[0],
                }
              )
            }
          })
        }
      }

      if (err) {
        this.layoutUtilsService.hidePreloader();
        this.layoutUtilsService.showSnack("error", err?.message || res?.message);
        this.router.navigate(['/'])
      }
    })
    let projectId = this.route.snapshot.params.id;
    this.layoutUtilsService.renamePath('Product name', projectId);
  }

}
