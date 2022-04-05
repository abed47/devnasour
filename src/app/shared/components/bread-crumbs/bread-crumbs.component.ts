import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit, OnDestroy {

  public paths: Array<{key: string, name: string, active: boolean}> = [];
  public subscriptions: Array<Subscription> = [];

  constructor(private router: Router, private layoutUtilsService: LayoutUtilsService) { }

  ngOnInit(): void {
    this.initCrumbs();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  private loadSubs(){
    this.subscriptions.push(this.layoutUtilsService.getBreadCrumbSubject().subscribe(r => {
      console.log(r)
      if(r.action === "change-active"){}
      if(r.action === "rename"){
        this.paths.forEach(el => {
          if(el.key == r.key) el.name = r.value
        })
      }
    }));
  }

  private initCrumbs(){
    let segments = window.location.pathname.split('/');
    segments.forEach((s, i) => s !== '' && s ? this.paths.push({key: s, name: s.toUpperCase(), active: i === segments.length - 1}) : null);
    this.loadSubs();

  }

  public navigateTo(item, index){
    console.log(index)
    let u = '';
    for(let i = 0; i <= index; i++){
      u += '/' + this.paths[i].key
    }
    this.router.navigate([u]);
  }

}
