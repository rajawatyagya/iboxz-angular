import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {COURSES, DIPLOMATITLE, GRADTITLE, HIGHERSECTITLE, INSTITUTES, OTHERQUALTITLE, POSTGRADTITLE} from '../../../../../shared/Constants';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {flyInOut} from '../../../../../animations/app.animation';
import {ApiService} from '../../../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class EducationComponent implements OnInit {

  // TODO: Title and institute auto complete, date picker format change using moment (or find something more reliable)

  @Input() userId: string;
  @Output() public getStep = new EventEmitter<number>();
  educationForm: FormGroup;
  step = 0;
  courses = COURSES;
  higherSecTitle =  HIGHERSECTITLE;
  diplomaTitle =    DIPLOMATITLE;
  gradTitle =       GRADTITLE;
  postGradTitle =   POSTGRADTITLE;
  otherQualTitle =  OTHERQUALTITLE;
  institutes =      INSTITUTES;
  filteredInstitute: Observable<string[]>;
  startDate = new Date(2000, 1, 1);

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertService: ToastrService
  ) { }

  ngOnInit() {
    this.educationForm = this.createEducationGroup(
      {value: this.courses[this.step].courseTitle, disabled: true},
      this.courses[this.step].courseType);
    this.filteredInstitute = this.getFilteredInstitutes();
  }

  instituteControl(): FormControl {
    return this.educationForm.get('institute') as FormControl;
  }

  createEducationGroup(courseTitle: any, courseType: string): FormGroup {
    return this.fb.group({
      user:         '',
      degree:       [courseTitle, Validators.required],
      courseType:   [courseType, Validators.required],
      institute:    ['', Validators.required],
      college:      ['', Validators.required],
      department:   ['', Validators.required],
      startDate:    ['', Validators.required],
      endDate:      ['', Validators.required],
      courseMode:   ['', Validators.required],
      percentage:   ['', Validators.required]
    });
  }

  getFilteredInstitutes(): Observable<string[]> {
    return this.instituteControl().valueChanges
      .pipe(
        startWith(''),
        map(institutes => institutes ? this.filterInstitutes(institutes) : this.institutes.slice())
      );
  }

  filterInstitutes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.institutes.filter(institute => institute.toLowerCase().includes(filterValue));
  }

  onEducationSubmit() {
    this.educationForm.patchValue({
      user: this.userId
    });
    this.apiService.saveEducation(this.educationForm.value).subscribe(
      (result) => {
        this.alertService.success(`${this.courses[this.step].courseTitle} details saved successfully.`, 'Alina:');
        if (this.step < this.courses.length) {
          this.step++;
          this.educationForm = this.createEducationGroup('',
            this.courses[this.step].courseType);
        } else {
          this.getStep.emit(3);
        }
      },
      err => {
        this.alertService.error(`${this.courses[this.step].courseTitle} details were not saved, try again.`, 'Alina:');
      }
    );
  }

}
