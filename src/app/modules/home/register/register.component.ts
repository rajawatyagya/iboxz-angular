import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ApiService} from '../../../services/api.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface UserObject {
  id: number;
  username: string;
}

interface TokenObject {
  id: number;
  token: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;

  userData = { username: '',
          password: '',
          otp: '',
          type: ''};

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    public dialog: MatDialog,
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      otp:      [0, Validators.required],
      type:     ['', Validators.required]
    });
  }

  onSubmit() {
    this.registerUser();
    this.dialogRef.close();
  }

  registerUser() {
    this.apiService.registerUser(this.userForm.value).subscribe(
      (result: UserObject) => {
        const loginForm = this.fb.group({
          username: this.userForm.value.username,
          password: this.userForm.value.password
        });
        this.apiService.loginUser(loginForm).subscribe(
          (res: TokenObject) => {
            this.cookieService.set('auth_token', res.token);
            this.cookieService.set('user_id', String(res.id));
          }
        );
        if (this.userForm.value.type === 'client') {
          this.router.navigate(['/employerRegistration']);
        } else { this.router.navigate(['/candidateRegistration']); }
        this.dialogRef.close();
      },
      error => {
        console.log(error);
      }
    );
  }

  formDisabled() {
    return !(
      this.userForm.value.username.length > 0
      &&
      this.userForm.value.password.length > 0
      &&
      this.userForm.value.otp.length === 4
      &&
      this.userForm.value.type.length > 0
    );
  }

}
