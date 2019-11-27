import { Component, OnInit } from '@angular/core';
import {DIPLOMATITLE, GRADTITLE, HIGHERSECTITLE, INSTITUTES, OTHERQUALTITLE, POSTGRADTITLE} from '../../../../../shared/Constants';
import {Observable} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  highSchoolForm: FormGroup;
  higherSecondaryForm: FormGroup;
  higherSecEqDiplomaForm: FormGroup;
  graduationForm: FormGroup;
  postGraduationForm: FormGroup;
  otherDiplomaForm: FormGroup;
  otherQualificationForm: FormGroup;

  higherSecTitle =  HIGHERSECTITLE;
  diplomaTitle =    DIPLOMATITLE;
  gradTitle =       GRADTITLE;
  postGradTitle =   POSTGRADTITLE;
  otherQualTitle =  OTHERQUALTITLE;
  institutes =      INSTITUTES;
  filteredGradInstitute: Observable<string[]>;
  filteredHigherSecInstitute: Observable<string[]>;
  filteredPostGradInstitute: Observable<string[]>;
  filteredOtherDiplomaInstitute: Observable<string[]>;
  filteredOtherQualInstitute: Observable<string[]>;

  startDate = new Date(2000, 1, 1);

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.filteredGradInstitute = this.getFilteredInstitutes('graduation');
    this.filteredHigherSecInstitute = this.getFilteredInstitutes('higherSecEqDiploma');
    this.filteredPostGradInstitute = this.getFilteredInstitutes('postGraduation');
    this.filteredOtherDiplomaInstitute = this.getFilteredInstitutes('otherDiploma');
    this.filteredOtherQualInstitute = this.getFilteredInstitutes('otherQualification');
    this.highSchoolForm =             this.createEducationGroup('High School', 'High School');
    this.higherSecondaryForm =        this.createEducationGroup('', 'Higher Secondary');
    this.higherSecEqDiplomaForm =     this.createEducationGroup('', 'Higher Secondary Equivalent Diploma');
    this.graduationForm =             this.createEducationGroup('', 'Graduation');
    this.postGraduationForm =         this.createEducationGroup('', 'Post Graduation');
    this.otherDiplomaForm =           this.createEducationGroup('', 'Other Diploma');
    this.otherQualificationForm =     this.createEducationGroup('', 'Other Qualification');
  }

  instituteControl(formGroup: string): FormControl {
    switch (formGroup) {
      case 'graduation': {
        return this.graduationForm.get('institute') as FormControl;
      }
      case 'higherSecEqDiploma': {
        return this.higherSecEqDiplomaForm.get('institute') as FormControl;
      }
      case 'postGraduation': {
        return this.postGraduationForm.get('institute') as FormControl;
      }
      case 'otherDiploma': {
        return this.otherDiplomaForm.get('institute') as FormControl;
      }
      case 'otherQualification': {
        return this.otherQualificationForm.get('institute') as FormControl;
      }
    }
  }

  createEducationGroup(courseTitle: string, courseType: string): FormGroup {
    return this.fb.group({
      courseTitle:  [courseTitle, Validators.required],
      courseType:   [courseType, Validators.required],
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
