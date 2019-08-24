import { Component, OnInit } from '@angular/core';
import { flyInOut } from '../../../animations/app.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../shared/profile/profile';

@Component({
  selector: 'app-employer-registration',
  templateUrl: './employer-registration.component.html',
  styleUrls: ['./employer-registration.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class EmployerRegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  registrationData: Profile;

  startDate = new Date(1994, 3, 14);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      name:           ['', Validators.required],
      contact:        ['', Validators.required],
      fax:            ['', Validators.required],
      accountManager: ['', Validators.required],
      website:        ['', Validators.required],
      industry:       ['', Validators.required],
      about: '',
      billingAddress: this.fb.group({
                      street: ['', Validators.required],
                      city: ['', Validators.required],
                      state: ['', Validators.required],
                      zipcode: ['', Validators.required],
                      country: ['', Validators.required],
      }),
    });
  }
}
