import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupName, Validators} from '@angular/forms';
import {Profile} from '../../../../shared/profile/profile';
import { angularMath } from 'angular-ts-math';

import { flyInOut } from '../../../../animations/app.animation';
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
} from '../../../../shared/Constants';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) {
  }

  ngOnInit() {
    this.createForm();
    this.filteredGradInstitute = this.getFilteredInstitutes('graduation');
    this.filteredHigherSecInstitute = this.getFilteredInstitutes('higherSecEqDiploma');
    this.filteredPostGradInstitute = this.getFilteredInstitutes('postGraduation');
    this.filteredOtherDiplomaInstitute = this.getFilteredInstitutes('otherDiploma');
    this.filteredOtherQualInstitute = this.getFilteredInstitutes('otherQualification');
  }

  get experience(): FormArray {
    return this.registrationForm.get('experience') as FormArray;
  }

  get language(): FormArray {
    return this.registrationForm.get('languages') as FormArray;
  }

  implementedSkillsArray(i: number): FormArray {
    return this.experience.at(i).get('skillSets').get('implemented') as FormArray;
  }

  acquiredSkillsArray(i: number): FormArray {
    return this.experience.at(i).get('skillSets').get('acquired') as FormArray;
  }

  createForm() {
    this.registrationForm = this.fb.group({
      title:              ['', Validators.required],
      firstName:          ['', Validators.required],
      middleName:         '',
      lastName:           ['', Validators.required],
      fatherFirstName:    '',
      fatherMiddleName:   '',
      fatherLastName:     '',
      highSchool:         this.createHighSchoolGroup(),
      higherSecondary:    this.createEducationGroup(),
      higherSecEqDiploma: this.createEducationGroup(),
      graduation:         this.createEducationGroup(),
      postGraduation:     this.createEducationGroup(),
      otherDiploma:       this.createEducationGroup(),
      otherQualification: this.createEducationGroup(),
      experience:         this.fb.array([]),
      email:              ['', Validators.required],
      mobile:             ['', Validators.required],
      dateOfBirth:                ['', Validators.required],
      currentSalary:      ['', Validators.required],
      expectedSalary:     ['', Validators.required],
      panNumber:          ['', Validators.required],
      aadharNumber:       ['', Validators.required],
      languages:          this.fb.array([]),
      address:            this.fb.group({
        permanentAddress:            this.fb.group({
          addressLine1:                   ['', Validators.required],
          addressLine2:                   ['', Validators.required],
          city:                           ['', Validators.required],
          state:                          ['', Validators.required],
          zipCode:                        ['', Validators.required],
          country:                        ['', Validators.required]
        }),
        presentAddress:            this.fb.group({
          addressLine1:                   ['', Validators.required],
          addressLine2:                   ['', Validators.required],
          city:                           ['', Validators.required],
          state:                          ['', Validators.required],
          zipCode:                        ['', Validators.required],
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
      linkedIn:           ''
    });
  }

  saveAddress() {
    const addressData = this.registrationForm.get('address') as FormGroup;

  }

  onSubmit() {
    this.registrationData = this.registrationForm.value;
    console.log(this.registrationData);
    this.router.navigate(['/profile']);
  }

  get highSchool() {
    return this.registrationForm.get('highSchool');
  }

  instituteControl(formGroup: string): FormControl {
    return this.registrationForm.get(formGroup).get('institute') as FormControl;
  }

  addExperience(): void {
    this.experience.push(this.createExperienceGroup());
    /*this.changeDetectorRef.detectChanges();*/
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
      proficiency:    ['', Validators.required]
    });
  }

  createEducationGroup(): FormGroup {
    return this.fb.group({
                courseTitle:  ['', Validators.required],
                institute:    ['', Validators.required],
                college:      ['', Validators.required],
                department:   ['', Validators.required],
                degree:       ['', Validators.required],
                startDate:    ['', Validators.required],
                endDate:      ['', Validators.required],
                type:         ['', Validators.required],
                percentage:   ['', Validators.required]
    });
  }

  createHighSchoolGroup(): FormGroup {
    return this.fb.group({
      courseTitle:  [{ value: 'High School', disabled: true}],
      institute:    ['', Validators.required],
      college:      ['', Validators.required],
      department:   ['', Validators.required],
      degree:       ['', Validators.required],
      startDate:    ['', Validators.required],
      endDate:      ['', Validators.required],
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
                functionalArea: ['', Validators.required],
                role:           ['', Validators.required],
                scope:          ['', Validators.required],
                summary:        ['', Validators.required],
                implementedSkills:    this.fb.array([]),
                acquiredSkills:       this.fb.array([]),
                startDate:      ['', Validators.required],
                endDate:        ['', Validators.required],
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
                noticePeriod:   ''
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
      this.totalDuration += item.value.endDate.getMonth() - item.value.startDate.getMonth() +
        (12 * (item.value.endDate.getFullYear() - item.value.startDate.getFullYear()));
      if (expItem === item) {
        item.value.duration = expItem.value.endDate.getMonth() - expItem.value.startDate.getMonth() +
          (12 * (expItem.value.endDate.getFullYear() - expItem.value.startDate.getFullYear()));
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
