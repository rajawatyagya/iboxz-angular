import { Component, OnInit } from '@angular/core';
import {flyInOut} from '../../../../animations/app.animation';
import {HttpClient} from '@angular/common/http';
import { Chart } from 'chart.js';
import {DonutChartData} from '../../../../shared/donutChartData';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class DonutChartComponent implements OnInit {
  data: DonutChartData[];
  url = 'http://localhost:3000/donut';

  tenure = [];
  chart = [];
  labels = [];
  backgroundColor = [];

  // TODO: last five + next five projections

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(this.url).subscribe((res: DonutChartData[]) => {
      res.forEach(y => {
        this.labels.push(y.company);
        this.tenure.push(y.tenure);
        this.backgroundColor.push(y.color);
      });
      this.chart = this.createSalaryPredictionChart();
    });
  }

  createSalaryPredictionChart(): Chart {
    return new Chart('canvas-donut', {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.tenure,
            backgroundColor: this.backgroundColor,
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false,
          position: 'bottom',
          fontSize: 20
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

}
