import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'user-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  public currentUser = {}
  constructor(
    private auth: AuthService,
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(){
    this.currentUser = this.auth.getAuthStatus().currentUser;
  }

}
