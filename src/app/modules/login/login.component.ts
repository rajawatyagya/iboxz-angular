import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterComponent } from '../register/register.component';

import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup} from '@angular/forms';

interface TokenObject {
  token: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  user = {username: '', password: '', remember: false};

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
    ) { }

  ngOnInit() {
    const authToken = this.cookieService.get('auth-token');
    if (authToken) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.dialogRef.close();
  }

  openRegisterForm() {
    this.dialog.open(RegisterComponent, {width: '650px', height: '550px'});   // the component is supplied to act as the view of the dialog
  }

  saveForm() {
    this.loginUser();
  }

  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObject) => {
        this.cookieService.set('auth-token', result.token);
        this.router.navigate(['/dashboard']);
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
