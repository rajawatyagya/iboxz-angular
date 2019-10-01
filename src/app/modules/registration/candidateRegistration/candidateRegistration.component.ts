import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupName, Validators} from '@angular/forms';
import {Profile} from '../../../shared/profile/profile';
import { angularMath } from 'angular-ts-math';

import { flyInOut } from '../../../animations/app.animation';
import {
  DIPLOMATITLE,
  GENDER,
  GRADTITLE,
  HIGHERSECTITLE,
  INSTITUTES,
  LANGUAGES,
  NAMETITLE,
  OTHERQUALTITLE,
  POSTGRADTITLE
} from '../../../shared/Constants';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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

  totalDuration = 0;
  totalMonth: string | number = 0;
  totalYears: string | number = 0;

  currentIndex = -1;

  registrationForm: FormGroup;
  registrationData: Profile;
  genderType =      GENDER;
  nameTitle =       NAMETITLE;
  higherSecTitle =  HIGHERSECTITLE;
  diplomaTitle =    DIPLOMATITLE;
  gradTitle =       GRADTITLE;
  languages =       LANGUAGES;
  institutes =      INSTITUTES;
  postGradTitle =   POSTGRADTITLE;
  otherQualTitle =  OTHERQUALTITLE;
  step = 0;
  last = 0;
  filteredGradInstitute: Observable<string[]>;
  filteredHigherSecInstitute: Observable<string[]>;
  filteredPostGradInstitute: Observable<string[]>;
  filteredOtherDiplomaInstitute: Observable<string[]>;
  filteredOtherQualInstitute: Observable<string[]>;
  @ViewChild('candidateForm', { read: true, static: false }) registrationFormDirective;

  startDate = new Date(2000, 1, 1);

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.createForm();
    this.filteredGradInstitute = this.getFilteredInstitutes('graduation');
    this.filteredHigherSecInstitute = this.getFilteredInstitutes('higherseceqdiploma');
    this.filteredPostGradInstitute = this.getFilteredInstitutes('postgraduation');
    this.filteredOtherDiplomaInstitute = this.getFilteredInstitutes('otherdiploma');
    this.filteredOtherQualInstitute = this.getFilteredInstitutes('otherqualification');
  }

  get experience(): FormArray {
    return this.registrationForm.get('experience') as FormArray;
  }

  get language(): FormArray {
    return this.registrationForm.get('languages') as FormArray;
  }

  implementedSkillsArray(i: number): FormArray {
    return this.experience.at(i).get('skillSet').get('implemented') as FormArray;
  }

  acquiredSkillsArray(i: number): FormArray {
    return this.experience.at(i).get('skillSet').get('acquired') as FormArray;
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
      experience:         this.fb.array([]),
      email:              ['', Validators.required],
      mobile:             ['', Validators.required],
      dob:                ['', Validators.required],
      currentSalary:      ['', Validators.required],
      expectedSalary:     ['', Validators.required],
      pannumber:          ['', Validators.required],
      aadharnumber:       ['', Validators.required],
      languages:          this.fb.array([]),
      address:            this.fb.group({
        permanentaddress:            this.fb.group({
          addressline1:                   ['', Validators.required],
          addressline2:                   ['', Validators.required],
          city:                           ['', Validators.required],
          state:                          ['', Validators.required],
          zipcode:                        ['', Validators.required],
          country:                        ['', Validators.required]
        }),
        presentaddress:            this.fb.group({
          addressline1:                   ['', Validators.required],
          addressline2:                   ['', Validators.required],
          city:                           ['', Validators.required],
          state:                          ['', Validators.required],
          zipcode:                        ['', Validators.required],
          country:                        ['', Validators.required]
        }),
        checked:                        ''
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

  instituteControl(formGroup: string): FormControl {
    return this.registrationForm.get(formGroup).get('institute') as FormControl;
  }

  addExperience(): void {
    this.experience.push(this.createExperienceGroup());
    this.changeDetectorRef.detectChanges();
  }

  addLanguage(item): void {
    this.language.push(this.fb.group({
                                    name:       item,
                                    read:       false,
                                    write:      false,
                                    speak:      false,
                                    native:     false
    }));
  }

  addImplementedSkillSet(item: string, i: number): void {
    this.implementedSkillsArray(i).push(this.createSkillSet(item));
  }

  addAcquiredSkillSet(item: string, i: number): void {
    this.acquiredSkillsArray(i).push(this.createSkillSet(item));
  }

  createSkillSet(item: string): FormGroup {
    return this.fb.group({
      name:           [item, Validators.maxLength(25)],
      beginner:       false,
      intermediate:   false,
      advanced:       false
    });
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
                title:          ['', Validators.required],
                company:        ['', Validators.required],
                industry:       ['', Validators.required],
                department:     ['', Validators.required],
                functionalarea: ['', Validators.required],
                role:           ['', Validators.required],
                scope:          ['', Validators.required],
                summary:        ['', Validators.required],
                skillSet:       this.fb.group(
                  {
                                implemented: this.fb.array([]),
                                acquired:    this.fb.array([])
                                }
                              ),
                startdate:      ['', Validators.required],
                enddate:        ['', Validators.required],
                duration:       '',
                current:        false,
                salary:         ['', Validators.required],
                docsAvailable:  this.fb.group({
                                offerLetter:    false,
                                salarySlip:     false,
                                expOrRelLetter: false,
                                resignAccept:   false,
                                promotion:      false
                }),
                noticeperiod:   ''
    });
  }

  deleteExperienceGroup(index: number): void {
    this.experience.removeAt(index);
  }

  deleteLanguage(index: number): void {
    this.language.removeAt(index);
  }

  deleteImpSkill(expIndex: number, skillIndex: number): void {
    this.implementedSkillsArray(expIndex).removeAt(skillIndex);
  }

  deleteAcqSkill(expIndex: number, skillIndex: number): void {
    this.acquiredSkillsArray(expIndex).removeAt(skillIndex);
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

  calculateDuration(expItem) {
    this.totalDuration = 0;
    for (const item of this.experience.controls) {
      this.totalDuration += item.value.enddate.getMonth() - item.value.startdate.getMonth() +
        (12 * (item.value.enddate.getFullYear() - item.value.startdate.getFullYear()));
      if (expItem === item) {
        item.value.duration = expItem.value.enddate.getMonth() - expItem.value.startdate.getMonth() +
          (12 * (expItem.value.enddate.getFullYear() - expItem.value.startdate.getFullYear()));
      }
    }
    this.totalYears = angularMath.getNumberWithDecimals(this.totalDuration / 12, 0);
    this.totalMonth = angularMath.getNumberWithDecimals(this.totalDuration % 12, 0);
  }

  currentExp(index) {
    this.currentIndex = index;
  }

  getFilteredInstitutes(formGroup: string): Observable<string[]> {
    return this.instituteControl(formGroup).valueChanges
      .pipe(
        startWith(''),
        map(institutes => institutes ? this.filterInstitutes(institutes) : this.institutes.slice())
      );
  }

  filterInstitutes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.institutes.filter(institute => institute.toLowerCase().includes(filterValue));
  }
}
