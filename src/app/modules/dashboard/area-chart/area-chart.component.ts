import { Component, OnInit } from '@angular/core';
import {AreaChartData} from '../../../shared/areaChartData';
import { Chart } from 'chart.js';

import { angularMath } from 'angular-ts-math';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit {
  data: [];
  testData: number[] = [];
  chart = [];
  labels = [];
  backgroundColor = [];

  // TODO: last five + next five projections

  constructor() { }

  ngOnInit() {
    this.testData = this.createTestData(4.5);
    console.log(this.testData);
    this.chart = this.createChart();
  }

  createTestData(initialSalary: number) {
    const test: number[] = [];
    for (let i = 0; i <= 4; i++) {
      if (i > 0 && i !== 3) {
        test.push(
          test[i - 1] + test[i - 1] * 0.08
        );
      } else if (i === 0) {
        test.push(
          initialSalary
        );
      } else {
        test.push(
          test[i - 1] + test[i - 1] * 0.3
        );
      }
    }
    return test;
  }

  createChart(): Chart {
    return new Chart('canvas-area', {
      type: 'area',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Salary Projection',
            data: this.testData,
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
