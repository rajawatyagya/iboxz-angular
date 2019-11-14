import { Component, OnInit } from '@angular/core';
import {flyInOut} from '../../../animations/app.animation';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class JobsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
