import {Component, OnInit, ViewChild} from '@angular/core';
import { flyInOut } from '../../../../animations/app.animation';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-registration',
  templateUrl: './candidateRegistration.component.html',
  styleUrls: ['./candidateRegistration.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class CandidateRegistrationComponent implements OnInit {

  @ViewChild('candSideNav', {static: false}) candSideNav: MatSidenav;

  constructor( ) {
  }

  ngOnInit() {  }

  isLargeScreen(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 720;
  }
}
