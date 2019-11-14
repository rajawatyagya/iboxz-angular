import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
  ) { }

  isUserAuthenticated() {
    return this.cookieService.get('auth-token') !== null;
  }
}
