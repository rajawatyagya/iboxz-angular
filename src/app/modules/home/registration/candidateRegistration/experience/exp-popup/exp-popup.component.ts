import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApiService} from '../../../../../../services/api.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-exp-popup',
  templateUrl: './exp-popup.component.html',
  styleUrls: ['./exp-popup.component.scss']
})
export class ExpPopupComponent implements OnInit {

  // TODO: date picker

  experienceForm: FormGroup;
  startDate = new Date(2000, 1, 1);

  constructor(
    public dialogRef: MatDialogRef<ExpPopupComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public userId: any
  ) { }

  ngOnInit() {
    this.experienceForm = this.fb.group({
      user:                 '',
      experience:           this.createExperienceGroup()
    });
  }

  createExperienceGroup(): FormGroup {
    return this.fb.group({
      title:            ['', Validators.required],
      company:          ['', Validators.required],
      industry:         ['', Validators.required],
      department:       ['', Validators.required],
      functionalArea:   ['', Validators.required],
      role:             ['', Validators.required],
      scope:            ['', Validators.required],
      summary:          ['', Validators.required],
      startDate:        ['', Validators.required],
      endDate:          ['', Validators.required],
      duration:         '',
      current:          false,
      salary:           ['', Validators.required],
      offerLetter:      false,
      salarySlip:       false,
      expOrRelLetter:   false,
      resignAccept:     false,
      promotionLetter:  false,
      noticePeriod:     '',
      skillSets:        this.fb.array([])
    });
  }

  createSkillSet(item: string): FormGroup {
    return this.fb.group({
      name:           [item, Validators.maxLength(25)],
      proficiency:    ['', Validators.required],
      skillType:      ['', Validators.required]
    });
  }

  get skillsArray(): FormArray {
    return this.experienceForm.get('experience').get('skillSets') as FormArray;
  }

  addSkillSet(item: string): void {
    this.skillsArray.push(this.createSkillSet(item));
  }

  deleteSkillSet(skillIndex: number): void {
    this.skillsArray.removeAt(skillIndex);
  }

  onExperienceSubmit() {
    this.experienceForm.patchValue({
      user: this.userId.id
    });
    this.apiService.saveExperience(this.experienceForm.value).subscribe(
      (result) => {
        this.alertService.success('Experience saved successfully.', 'Alina:');
        this.dialogRef.close(result);
      }
    );
  }

}
