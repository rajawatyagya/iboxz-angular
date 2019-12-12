import {Component, OnInit, ViewChild} from '@angular/core';
import { flyInOut } from '../../../../animations/app.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

interface User {
  id: string;
  user_type: string;
  email: string;
  username: string;
}

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

  imageUrl: any;
  fileData: File = null;

  registrationForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private alertService: ToastrService
  ) {}

  ngOnInit() {
    this.apiService.getUser().subscribe(
      (result: User) => {
        this.user = result;
        this.createForm();
      }
    );
  }

  onSubmit() {
    this.registrationForm.patchValue({
      user:       this.user.id
    });
    this.saveProfilePicture();
    this.apiService.saveEmployerProfile(this.registrationForm.value).subscribe(
      () => {
        this.alertService.success('Employer Details Saved', 'Alina:');
      }
    );
  }

  createForm() {
    this.registrationForm = this.fb.group({
      user:                   '',
      companyName:            ['', Validators.required],
      recruiterName:          ['', Validators.required],
      designation:            ['', Validators.required],
      industry:               ['', Validators.required],
      department:             ['', Validators.required],
      functionalArea:         ['', Validators.required],
      role:                   ['', Validators.required],
      email:                  [{value: this.user.email, disabled: true}],
      accountType:            '',
      mobileNumber:           ['', Validators.required],
      landLine:               ['', Validators.required],
      website:                ['', Validators.required],
      about:                  '',
      address:                this.fb.group({
        addressLine1:       ['', Validators.required],
        addressLine2:       ['', Validators.required],
        city:               ['', Validators.required],
        state:              ['', Validators.required],
        zipCode:            ['', Validators.required],
        country:            ['', Validators.required],
        address_type:       ['present', Validators.required]
      }),
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
}
