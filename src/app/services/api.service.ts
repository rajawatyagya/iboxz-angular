import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(
      `${this.baseUrl}auth/`,
      body,
      {headers: this.headers}
    );
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(
      `${this.baseUrl}api/users/`, body,
      {headers: this.headers}
    );
  }

  getAuthHeaders() {
    const token = this.cookieService.get('auth-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
}
