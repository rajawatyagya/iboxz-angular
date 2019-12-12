import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../../../shared/profile/profile';
import {GENDER, LANGUAGES, NAMETITLE} from '../../../../../shared/Constants';
import {ApiService} from '../../../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {flyInOut} from '../../../../../animations/app.animation';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class PersonalComponent implements OnInit {

  @Input() userId: string;
  @Output() public getStep = new EventEmitter<number>();
  imageUrl: any;
  fileData: File = null;
  registrationForm: FormGroup;
  languageForm: FormGroup;
  registrationData: Profile;
  genderType =      GENDER;
  nameTitle =       NAMETITLE;
  languages =       LANGUAGES;

  step = 0;
  last = 0;

  startDate = new Date(2000, 1, 1);

  constructor(
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private apiService: ApiService,
    private alertService: ToastrService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  get language(): FormArray {
    return this.languageForm.get('languageArray') as FormArray;
  }

  createForm() {
    this.registrationForm = this.fb.group({
      user:               '',
      title:              ['', Validators.required],
      firstName:          ['', Validators.required],
      middleName:         '',
      lastName:           ['', Validators.required],
      fatherFirstName:    '',
      fatherMiddleName:   '',
      fatherLastName:     '',
      mobile:             ['', Validators.required],
      dateOfBirth:        ['', Validators.required],
      currentSalary:      ['', Validators.required],
      expectedSalary:     ['', Validators.required],
      panNumber:          ['', Validators.required],
      aadharNumber:       ['', Validators.required],
      gender:             '',
      message:            '',
      resume:             '',
      facebook:           '',
      twitter:            '',
      linkedIn:           ''
    });
    this.languageForm = this.fb.group({
      user:               '',
      languageArray:  this.fb.array([])
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }

  saveProfilePicture() {
    const formData = new FormData();
    formData.append('image', this.fileData);
    this.apiService.uploadProfilePicture(formData).subscribe(
      (result) => {
        this.alertService.success('Profile picture uploaded successfully.', 'Alina:');
      }
    );
  }

  onCandidateSubmit() {
    this.registrationForm.patchValue({
      user: this.userId
    });
    this.saveProfilePicture();
    this.apiService.saveCandidateProfile(this.registrationForm.value).subscribe(
      (result) => {
        this.alertService.success('Candidate details uploaded successfully.', 'Alina:');
      }
    );
    this.registrationData = this.registrationForm.value;
  }

  onLanguageSubmit() {
    this.languageForm.patchValue({
      user:       this.userId,
    });
    this.apiService.saveLanguage(this.languageForm.value).subscribe(
      (result) => {
        this.alertService.success('Language details uploaded successfully.', 'Alina:');
      }
    );
  }

  submitForm() {
    this.onCandidateSubmit();
    this.onLanguageSubmit();
    this.getStep.emit(1);
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

  deleteLanguage(index: number): void {
    this.language.removeAt(index);
  }

  resetCandidateForm() {
    this.registrationForm.reset();
  }

  resetLanguageForm() {
    this.languageForm.reset();
  }
}
