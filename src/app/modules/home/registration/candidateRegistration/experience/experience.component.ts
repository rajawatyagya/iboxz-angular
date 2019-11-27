import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../../../../services/api.service';
import {ToastrService} from 'ngx-toastr';
import {angularMath} from 'angular-ts-math';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  experienceFormArray: FormArray;
  candidateSkillSetFormArray: FormArray;

  startDate = new Date(2000, 1, 1);

  totalDuration = 0;
  totalMonth: string | number = 0;
  totalYears: string | number = 0;
  currentIndex = -1;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.experienceFormArray =        this.fb.array([]);
    this.candidateSkillSetFormArray = this.fb.array([]);
  }

  get experience(): FormArray {
    return this.experienceFormArray;
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
      startDate:      ['', Validators.required],
      endDate:        ['', Validators.required],
      duration:       '',
      current:        false,
      salary:         ['', Validators.required],
      offerLetter:    false,
      salarySlip:     false,
      expOrRelLetter: false,
      resignAccept:   false,
      promotionLetter: false,
      noticePeriod:   ''
    });
  }

  deleteExperienceGroup(index: number): void {
    this.experience.removeAt(index);
  }

  createSkillSet(item: string, skillType: string): FormGroup {
    return this.fb.group({
      name:           [item, Validators.maxLength(25)],
      proficiency:    ['', Validators.required],
      skillType:      [skillType, Validators.required]
    });
  }

  addExperience(): void {
    this.experience.push(this.createExperienceGroup());
  }

  skillsArray(i: number): FormArray {
    return this.candidateSkillSetFormArray;
  }

  addImplementedSkillSet(item: string, skillType: string, i: number): void {
    this.skillsArray(i).push(this.createSkillSet(item, skillType));
  }

  addAcquiredSkillSet(item: string, skillType: string, i: number): void {
    this.skillsArray(i).push(this.createSkillSet(item, skillType));
  }

  deleteImpSkill(expIndex: number, skillIndex: number): void {
    this.skillsArray(expIndex).removeAt(skillIndex);
  }

  deleteAcqSkill(expIndex: number, skillIndex: number): void {
    this.skillsArray(expIndex).removeAt(skillIndex);
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

}
