import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  public totalPrice = 0;
  public lidOptions = {
    option1: true,
    option2: false,
    option3: false,
    option4: false
  }

  public itemOptions = {
    option1: true,
    option2: false,
    option3: false,
    option4: false
  }

  public itemOptions2 = {
    option1: true,
    option2: false,
    option3: false,
    option4: false
  }

  constructor() { }

  ngOnInit(): void {
  }

  public onLidOptionsChange(o){
    if(o === null){
      this.lidOptions = {
        option1: false,
        option2: false,
        option3: false,
        option4: false
      }
      return;
    }

    Object.keys(this.lidOptions).forEach((k, i)=> {
      if(i === o) return this.lidOptions[k] = true;
      this.lidOptions[k] = false;
    })
  }

}
