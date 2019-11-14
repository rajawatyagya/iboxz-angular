import { Component, OnInit } from '@angular/core';
import {flyInOut} from '../../../animations/app.animation';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ReferComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
