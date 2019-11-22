import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../../shared/profile/profile';
import {flyInOut} from '../../../../animations/app.animation';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    style: 'display: block;',
    '[@flyInOut]': 'true'
  },
  animations: [
    flyInOut()
  ]
})
export class JobPostingComponent implements OnInit {

  registrationForm: FormGroup;
  registrationData: Profile;

  @ViewChild('jobPostingForm', { read: true, static: false }) registrationFormDirective;

  constructor(
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.registrationData = this.registrationForm.value;
    console.log(this.registrationData);
  }

  get skillSetsRequired(): FormArray {
    return this.registrationForm.get('skillSetsRequired') as FormArray;
  }

  addRequiredSkillSet(item: string): void {
    this.skillSetsRequired.push(this.createSkillSet(item));
    this.changeDetectorRef.detectChanges();
    console.log(this.skillSetsRequired.value);
  }

  createSkillSet(item: string): FormGroup {
    return this.fb.group({
      name:           [item, Validators.maxLength(25)],
      proficiency:    ''
    });
  }

  createForm() {
    this.registrationForm = this.fb.group({
      jobTitle:               ['', Validators.required],
      workLocation:           ['', Validators.required],
      designation:            ['', Validators.required],
      industry:               ['', Validators.required],
      department:             ['', Validators.required],
      functionalArea:         ['', Validators.required],
      role:                   ['', Validators.required],
      scope:                  ['', Validators.required],
      expRange:               ['', Validators.required],
      salaryRange:            this.fb.group({
                              to:     '',
                              from:   ''
      }),
      skillSetsRequired:      this.fb.array([]),
      joiningTimeline:        this.fb.group(
        {
                              immediate:      false,
                              noticePeriod:   this.fb.group({
                                fifteenDays:  false,
                                month:        false,
                                fortyFive:    false,
                                twoMonths:    false,
                                threeMonths:  false
                              }),
        }
      ),
      jobDescription:         ''
    });
  }

  deleteReqSkill(skillIndex: number): void {
    this.skillSetsRequired.removeAt(skillIndex);
  }

}
