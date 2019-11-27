import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

interface UserObj {
  user_type: string;
  email: string;
  id: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private username = '';

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
      `${this.baseUrl}api/auth/token/login/`,
      body,
      {headers: this.headers}
    );
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(
      `${this.baseUrl}api/auth/users/`, body,
      {headers: this.headers}
    );
  }

  getUserName() {
    if (this.cookieService.get('user_name')) {
      this.username =  this.cookieService.get('user_name');
    } else {
      this.getUser().subscribe(
        (result: UserObj) => {
          this.username = result.username;
        }
      );
    }
    return this.username;
  }

  getUser() {
    return this.httpClient.get(
      `${this.baseUrl}api/auth/users/me`,
      {headers: this.getAuthHeaderWithJson()});
  }

  getAuthHeaderWithJson() {
    const token = this.cookieService.get('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }

  getAuthHeaderWithoutJson() {
    const token = this.cookieService.get('auth_token');
    return new HttpHeaders({
      Authorization: `Token ${token}`
    });
  }

  saveAudioFile(data) {
    return this.httpClient.post(
      `${this.baseUrl}api/evaluation/save_audio/`, data,
      {headers: this.getAuthHeaderWithoutJson()}
    );
  }

  activateUser(data) {
    const body = JSON.stringify(data);
    return this.httpClient.post(
      `${this.baseUrl}api/auth/users/activation/`, body,
      {headers: this.headers}
    );
  }

  saveUserAddressData(data) {
    const body = JSON.stringify(data);
    return this.httpClient.post(
      `${this.baseUrl}api/`,
      body,
      {headers: this.getAuthHeaderWithJson()}
    );
  }

  uploadProfilePicture(data) {
    return this.httpClient.post(
      `${this.baseUrl}api/users/${this.getUserName()}/save_profile_picture/`, data,
      {headers: this.getAuthHeaderWithoutJson()}
    );
  }

  saveCandidateProfile(data) {
    const body = JSON.stringify(data);
    return this.httpClient.post(
      `${this.baseUrl}api/candidate/save_candidate/`, body,
      {headers: this.getAuthHeaderWithJson()}
    );
  }

  saveLanguage(data) {
    const body = JSON.stringify(data);
    return this.httpClient.post(
      `${this.baseUrl}api/languages/save_languages/`, body,
      {headers: this.getAuthHeaderWithJson()}
    );
  }

  saveAddress(data) {
    const body = JSON.stringify(data);
    return this.httpClient.post(
      `${this.baseUrl}api/address/`, body,
      {headers: this.getAuthHeaderWithoutJson()}
    );
  }
}
