import {Component, OnInit, ViewChild} from '@angular/core';
import { flyInOut } from '../../../../animations/app.animation';
import {MatSidenav} from '@angular/material';
import {ApiService} from '../../../../services/api.service';

interface User {
  id: string;
  user_type: string;
  email: string;
  username: string;
}

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

  step = 0;
  user: User;

  constructor(
    private apiService: ApiService
  ) {
    this.apiService.getUser().subscribe(
      (result: User) => {
        this.user = result;
      }
    );
  }

  ngOnInit() {

  }

  setStep(step: number) {
    this.step = step;
  }

  isLargeScreen(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 720;
  }
}
