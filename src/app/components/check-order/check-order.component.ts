import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Order} from '../../entity/order';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../service/order/order.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


class HisOrd {
  cDate: string; ordCount: string;

  constructor(cDate: string, ordCount: string) {
    this.cDate = cDate;
    this.ordCount = ordCount;
  }
}

@Component({
  selector: 'app-check-order',
  templateUrl: './check-order.component.html',
  styleUrls: ['./check-order.component.css']
})
export class CheckOrderComponent implements OnInit {
  private cDate = '';
  private ordCount = '';
  hisOrds: HisOrd[] = [];
  label = [];

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService) {
  }
  patOrds: Order[] | undefined;
  patId: any;
  name: any;
  date: Date = new Date();

  barChartOptions: ChartOptions  = {
    responsive: true
  };

  mbarChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105,159,177,0.2)',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    }
  ];

  public barChartData: ChartDataSets[] = [];

  ngOnInit(): void {
    this.setName();
    this.activatedRoute.paramMap.subscribe(() => {
      this.listPatOrders();
      this.barChartOrders();
      this.orderService.getHisOrders(this.patId).subscribe(
        data => {
          this.mbarChartLabels = [data[0].cDate, data[1].cDate, data[2].cDate, data[3].cDate, data[4].cDate, data[5].cDate, data[6].cDate];
          this.barChartData = [{
              // tslint:disable-next-line:max-line-length
              data: [Number(data[0].ordCount), Number(data[1].ordCount), Number(data[2].ordCount), Number(data[3].ordCount), Number(data[4].ordCount), Number(data[5].ordCount), Number(data[6].ordCount)],
              label: 'Delay orders in Last seven days'
            }];
        });
    });
    // this.date.setDate(this.date.getDay() - 7);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  setName(): string {
    this.activatedRoute.queryParams.subscribe(params => {
      this.patId = params.id;
      this.name = params.name;
    });
    return this.name;
  }

  listPatOrders(): void{
    console.log(this.date);
    this.orderService.getPatOrders(this.patId).subscribe(
      // data => {
      //   console.log(data);
      // }
      data => this.patOrds = data
    );
  }

  barChartOrders(): void{
    this.orderService.getHisOrders(this.patId).subscribe(
      data => {
        console.log(data[0].cDate);
      }
      // data => this.hisOrds = data
    );
  }
}


// public randomize(): void {
//   const data = [
//     Math.round(Math.random() * 100),
//     Math.round(Math.random() * 100),
//     Math.round(Math.random() * 100),
//     (Math.random() * 100),
//     Math.round(Math.random() * 100),
//     (Math.random() * 100),
//     Math.round(Math.random() * 100)];
//   const clone = JSON.parse(JSON.stringify(this.barChartData));
//   clone[0].data = data;
//   this.barChartData = clone;
// }
