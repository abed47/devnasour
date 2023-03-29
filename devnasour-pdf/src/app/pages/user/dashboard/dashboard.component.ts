import { Component, OnInit } from '@angular/core';
import { ChartColor, ChartData, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { AuthService } from 'src/app/services/auth.service';
import { LayoutUtilsService } from 'src/app/services/layout-utils.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public selectedFilter = 1;

  public filterTypes = [1, 2, 3]

  public chart1Labels = [];
  public chart1Data = [];
  public chart1Type = "doughnut";
  public chart1Colors: Color[] = [{
    backgroundColor: ['#1921FA', '#46D767', '#FF8D0E']
   }];
  public chart1Options: ChartOptions = {
    legend: {
      display: false,
    }
  }
  // public chart1Directive
  

  public data = {
    stats: [
      {
        label: "On The Way",
        value: 7
      },
      {
        label: "Delivered",
        value: 15
      },
      {
        label: "Canceled",
        value: 3
      }
    ]
  }

  constructor(
    private request: RequestService,
    private auth: AuthService,
    private layoutUtils: LayoutUtilsService
  ) { }

  ngOnInit(): void {
    this.buildSettings();
  }

  private async buildSettings() {
    // const data = this.data;

    // data.stats.forEach(item => {
    //   this.chart1Data.push(item.value);
    //   this.chart1Labels.push(item.label);
    // })

    try {
      const user = this.auth.getAuthStatus();
      console.log(user);
      const r = await this.request.getDashboard(user.currentUser.web_user_id);
      console.log("res >>>>>>>>>>>>>>>>>> : ", r);
    } catch (err) {
      this.layoutUtils.showSnack("error", err?.message);
    }
  }

  public getBars(){
    return this?.data?.stats;
  }

  public getBarPercentage(item, list: any[]) {
    let total = 0;
    if (list?.length) {
      total = list?.reduce((p, c, i) => {
        if (i === 1) return +p.value + +c.value;
        return +c.value + +p;
      }) || 0;  
    }
    // console.log(item, list)
    return `${this.getPercentage(total, item.value)}%`;
    // return '55%' 
  }

  public getPercentage(total = 0, amount = 0) {
    // return 55
    return ((amount / total) * 100).toFixed(2);
  }

  // public drawMap(){
  //   const map = new DottedMap({
  //     height: 500,
  //     width: 200,
  //     // countries: ['FRA']
  //     // region: { lat: { min, max }, lng: { min, max } },
  //     grid: 'vertical',
  //     avoidOuterPins: false,
  //   });
    
  //   // map.addPin({
  //   //   lat,
  //   //   lng,
  //   //   svgOptions: { color, radius },
  //   //   data,
  //   // });
    
  //   // If you want to get the raw array of points
  //   map.getPoints();
  //   // [{ x, y, data, svgOptions }]
    
  //   // Or use this method to get a string which is a SVG
  //   const svg = map.getSVG({
  //     shape: 'circle',
  //     backgroundColor: '#FF00FF',
  //     color: '#FFFF00',
  //     radius: 0.5,
  //   });
  //   console.log(svg)
  // }
}
