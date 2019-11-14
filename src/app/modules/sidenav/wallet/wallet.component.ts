import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {flyInOut} from '../../../animations/app.animation';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class WalletComponent implements OnInit {

  constructor(private alertService: ToastrService) { }

  ngOnInit() {
    this.alertService.success('Wallet initialized', 'Alina');
  }

}
