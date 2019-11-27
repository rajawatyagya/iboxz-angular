import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyLoggedInUserGuard implements CanActivate {
  constructor(
    private alertService: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.alertService.error('You are not logged in.' , 'Alina');
      this.router.navigate(['/home']);
      return false;
    }
  }

}
