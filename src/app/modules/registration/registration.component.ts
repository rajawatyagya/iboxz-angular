import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Profile, Gender } from '../../shared/profile/profile';
import { flyInOut } from '../../animations/app.animation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  registrationData: Profile;
  genderType = Gender;
  @ViewChild('rform', { read: true, static: false }) registrationFormDirective;

  startDate = new Date(1994, 3, 14);

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  get education(): FormArray {
    return this.registrationForm.get('education') as FormArray;
  }

  get experience(): FormArray {
    return this.registrationForm.get('experience') as FormArray;
  }

  createForm() {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      education: this.fb.array([this.createEducationGroup()]),
      experience: this.fb.array([this.createExperienceGroup()]),
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      dob: ['', Validators.required],
      currentSalary: ['', Validators.required],
      expectedSalary: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required],
        country: ['', Validators.required],
      }),
      gender: '',
      message: '',
      resume: '',
      facebook: '',
      twitter: '',
      linkedin: ''
    });
  }

  onSubmit() {
    this.registrationData = this.registrationForm.value;
    console.log(this.registrationData);
  }

  addEducation(): void {
    this.education.push(this.createEducationGroup());
  }

  addExperience(): void {
    this.experience.push(this.createExperienceGroup());
  }

  createEducationGroup(): FormGroup {
    return this.fb.group({
      institute: ['', Validators.required],
      department: ['', Validators.required],
      degree: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  createExperienceGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      summary: ['', Validators.required],
      skillSet: ['', Validators.required],
      duration: ['', Validators.required],
      current: false
    });
  }

  deleteEducationGroup(index: number): void {
    this.education.removeAt(index);
  }

  deleteExperienceGroup(index: number): void {
    this.experience.removeAt(index);
  }
}
