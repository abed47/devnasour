import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'main-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public moveToLogin () {
    this.router.navigate(['/login'])
  }
}
