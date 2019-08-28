import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile,
        Gender,
        NameTitle,
        HigherSecTitle,
        DiplomaTitle,
        GradTitle,
        PostGradTitle,
        OtherQualTitle} from '../../../shared/profile/profile';
import { flyInOut } from '../../../animations/app.animation';

@Component({
  selector: 'app-registration',
  templateUrl: './candidateRegistration.component.html',
  styleUrls: ['./candidateRegistration.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class CandidateRegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  registrationData: Profile;
  genderType = Gender;
  nameTitle = NameTitle;
  higherSecTitle = HigherSecTitle;
  diplomaTitle = DiplomaTitle;
  gradTitle = GradTitle;
  postGradTitle = PostGradTitle;
  otherQualTitle = OtherQualTitle;
  step = 0;
  last = 0;
  @ViewChild('rform', { read: true, static: false }) registrationFormDirective;

  startDate = new Date(1994, 3, 14);

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.createForm();
  }

  get experience(): FormArray {
    return this.registrationForm.get('experience') as FormArray;
  }

  createForm() {
    this.registrationForm = this.fb.group({
      title:              ['', Validators.required],
      firstname:          ['', Validators.required],
      middlename:         '',
      lastname:           ['', Validators.required],
      fatherfirstname:    '',
      fathermiddlename:   '',
      fatherlastname:     '',
      highschool:         this.createHighschoolGroup(),
      highersecondary:    this.createEducationGroup(),
      higherseceqdiploma: this.createEducationGroup(),
      graduation:         this.createEducationGroup(),
      postgraduation:     this.createEducationGroup(),
      otherdiploma:       this.createEducationGroup(),
      otherqualification: this.createEducationGroup(),
      experience:         this.fb.array([this.createExperienceGroup()]),
      email:              ['', Validators.required],
      mobile:             ['', Validators.required],
      dob:                ['', Validators.required],
      currentSalary:      ['', Validators.required],
      expectedSalary:     ['', Validators.required],
      pannumber:          ['', Validators.required],
      aadharnumber:       ['', Validators.required],
      languages:          '',
      address:            this.fb.group({
        addressline1:                   ['', Validators.required],
        addressline2:                   ['', Validators.required],
        city:                           ['', Validators.required],
        state:                          ['', Validators.required],
        zipcode:                        ['', Validators.required],
        country:                        ['', Validators.required],
      }),
      image:              '',
      gender:             '',
      message:            '',
      resume:             '',
      facebook:           '',
      twitter:            '',
      linkedin:           ''
    });
  }

  onSubmit() {
    this.registrationData = this.registrationForm.value;
    console.log(this.registrationData);
  }

  get highschool() {
    return this.registrationForm.get('highschool');
  }

  addExperience(): void {
    this.experience.push(this.createExperienceGroup());
    this.changeDetectorRef.detectChanges();
  }

  createEducationGroup(): FormGroup {
    return this.fb.group({
                coursetitle:  ['', Validators.required],
                institute:    ['', Validators.required],
                college:      ['', Validators.required],
                department:   ['', Validators.required],
                degree:       ['', Validators.required],
                startdate:    ['', Validators.required],
                enddate:      ['', Validators.required],
                type:         ['', Validators.required],
                percentage:   ['', Validators.required]
    });
  }

  createHighschoolGroup(): FormGroup {
    return this.fb.group({
      coursetitle:  [{ value: '10th', disabled: true}, Validators.required],
      institute:    ['', Validators.required],
      college:      ['', Validators.required],
      department:   ['', Validators.required],
      degree:       ['', Validators.required],
      startdate:    ['', Validators.required],
      enddate:      ['', Validators.required],
      type:         ['', Validators.required],
      percentage:   ['', Validators.required]
    });
  }

  createExperienceGroup(): FormGroup {
    return this.fb.group({
                title:        ['', Validators.required],
                company:      ['', Validators.required],
                summary:      ['', Validators.required],
                skillSet:     ['', Validators.required],
                startdate:    ['', Validators.required],
                enddate:      ['', Validators.required],
                current:      false
    });
  }

  deleteExperienceGroup(index: number): void {
    this.experience.removeAt(index);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
