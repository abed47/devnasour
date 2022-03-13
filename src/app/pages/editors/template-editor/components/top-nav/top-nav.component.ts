import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'two-d-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public fileTitle: string = "untitled";
  public titleEditingActive: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
