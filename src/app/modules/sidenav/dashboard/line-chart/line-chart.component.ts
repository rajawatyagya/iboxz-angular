import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LineChartData} from '../../../../shared/lineChartData';
import { Chart } from 'chart.js';
import {flyInOut} from '../../../../animations/app.animation';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class LineChartComponent implements OnInit {

  data: LineChartData[];
  url = 'http://localhost:3000/results';

  CTC = [];
  year = [];
  chart = [];
  labels = [];

  // TODO: last five + next five projections

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(this.url).subscribe((res: LineChartData[]) => {
      res.forEach(y => {
        this.labels.push(+y.year + 2018);
        this.CTC.push(y.CTC);
        this.year.push(y.year);
      });
      this.chart = this.createSalaryPredictionChart();
    });
  }

  createSalaryPredictionChart(): Chart {
    return new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Salary Projection',
            data: this.CTC,
            borderColor: '#FF5D00',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          fontSize: 20
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Years',
              fontSize: 20
            },
            ticks: {
              fontSize: 15
            },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'CTC (in Lacs)',
              fontSize: 20
            },
            ticks: {
              fontSize: 15
            },
            gridLines: {
              display: false
            }
          }],
        }
      }
    });
  }

}
