import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {flyInOut} from '../../animations/app.animation';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ActivationComponent implements OnInit {

  actData = {
    uid: '',
    token: ''
  };

  buttonDisabled = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private alertService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.actData.uid = params.id;
      this.actData.token = params.key;
    });
  }

  activateNow() {
    this.buttonDisabled = true;
    this.apiService.activateUser(this.actData).subscribe(
      () => {
        this.alertService.success('Account Activation Successful.\nClick me to login.', 'Alina:').onTap.subscribe(
          () => {
            this.router.navigate(['/home']);
          }
        );
      }, error => {
        this.alertService.success('There was an error while activating your account.', 'Alina:');
      }
    );
  }

}
