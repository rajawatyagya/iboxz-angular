import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ApiService} from '../../../services/api.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

interface UserObject {
  id: number;
  username: string;
  email: string;
  user_type: string;
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

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    public dialog: MatDialog,
    private apiService: ApiService,
    private cookieService: CookieService,
    private alertService: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      re_password: ['', Validators.required],
      email: ['', Validators.required],
      user_type:     ['', Validators.required]
    });
  }

  onSubmit() {
    this.registerUser();
    this.dialogRef.close();
  }

  registerUser() {
    this.apiService.registerUser(this.userForm.value).subscribe(
      (result: UserObject) => {
        this.cookieService.set('user_name', result.username);
        this.alertService.success('Account Creation Successful.\nPlease, check for verification email.', 'Alina:');
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
      this.userForm.value.re_password.length > 0
      &&
      this.userForm.value.password === this.userForm.value.re_password
      &&
      this.userForm.value.user_type.length > 0
    );
  }

}
