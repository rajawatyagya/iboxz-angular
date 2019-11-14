import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUserGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private alertService: ToastrService
  ) {}

  canActivate() {
    if (this.auth.isUserAuthenticated()) {
      return true;
    } else {
      this.alertService.error('You are not logged in.' , 'Alina');
    }
  }

}
