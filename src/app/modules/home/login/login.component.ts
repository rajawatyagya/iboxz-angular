import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface TokenObject {
  token: string;
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
    private fb: FormBuilder
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
        this.cookieService.set('auth_token', result.token);
        this.router.navigate(['/navigation']);
        this.dialogRef.close();
      },
      error => {
        console.log(error);
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
