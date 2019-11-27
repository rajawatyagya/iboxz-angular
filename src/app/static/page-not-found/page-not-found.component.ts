import { Component, OnInit } from '@angular/core';
import {flyInOut} from '../../animations/app.animation';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
