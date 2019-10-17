import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor(private alertService: ToastrService) { }

  ngOnInit() {
    this.alertService.success('Wallet initialized', 'Alina');
  }

}
