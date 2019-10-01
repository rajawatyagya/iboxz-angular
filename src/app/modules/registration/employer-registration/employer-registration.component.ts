import {Component, OnInit, ViewChild} from '@angular/core';
import { flyInOut } from '../../../animations/app.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../shared/profile/profile';

@Component({
  selector: 'app-employer-registration',
  templateUrl: './employer-registration.component.html',
  styleUrls: ['./employer-registration.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    style: 'display: block;',
    '[@flyInOut]': 'true'
  },
  animations: [
    flyInOut()
  ]
})
export class EmployerRegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  registrationData: Profile;

  @ViewChild('employerForm', { read: true, static: false }) registrationFormDirective;

  startDate = new Date(2000, 1, 1);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.registrationData = this.registrationForm.value;
    console.log(this.registrationData);
  }

  createForm() {
    this.registrationForm = this.fb.group({
      companyName:            ['', Validators.required],
      recruiterName:          ['', Validators.required],
      designation:            ['', Validators.required],
      industry:               ['', Validators.required],
      department:             ['', Validators.required],
      functionalarea:         ['', Validators.required],
      role:                   ['', Validators.required],
      email:                  [{value: 'test@iboxz.in', disabled: true}],
      accountType:            '',
      mobileNumber:           ['', Validators.required],
      landLine:               ['', Validators.required],
      website:                ['', Validators.required],
      about:                  '',
      address:                this.fb.group({
                              billingAddress:       this.fb.group({
                                                    addressline1:       ['', Validators.required],
                                                    addressline2:       ['', Validators.required],
                                                    city:               ['', Validators.required],
                                                    state:              ['', Validators.required],
                                                    zipcode:            ['', Validators.required],
                                                    country:            ['', Validators.required]}),
                              companyAddress:       this.fb.group({
                                                    addressline1:       ['', Validators.required],
                                                    addressline2:       ['', Validators.required],
                                                    city:               ['', Validators.required],
                                                    state:              ['', Validators.required],
                                                    zipcode:            ['', Validators.required],
                                                    country:            ['', Validators.required]}),
                              checked:              ''
      })
    });
  }
}
