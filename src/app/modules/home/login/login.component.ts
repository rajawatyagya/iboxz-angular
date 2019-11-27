import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

interface TokenObject {
  auth_token: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: ToastrService
    ) { }

  ngOnInit() {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: false
    });
  }

  onSubmit() {
    this.loginUser();
    this.dialogRef.close();
  }

  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObject) => {
        this.cookieService.set('auth_token', result.auth_token);
        this.cookieService.set('user_name', this.authForm.value.username);
        this.router.navigate(['/navigation']);
        this.dialogRef.close();
      },
      error => {
        this.alertService.success('There was an error while logging in.', 'Alina:');
      }
    );
  }

  formDisabled() {
    return !(
      this.authForm.value.username.length > 0
      &&
      this.authForm.value.password.length > 0
    );
  }

}
