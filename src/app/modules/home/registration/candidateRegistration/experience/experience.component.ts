import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {angularMath} from 'angular-ts-math';
import {flyInOut} from '../../../../../animations/app.animation';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../../../login/login.component';
import {ExpPopupComponent} from './exp-popup/exp-popup.component';
import {Router} from '@angular/router';

interface ExpObj {
  message: string;
  result: {
    experience: {
      id: string;
      title: string;
      company: string;
      startDate: string;
      endDate: string;
    };
    skills: string[];
  };
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ExperienceComponent implements OnInit {

  @Input() userId: string;
  experienceArray: {
    experience: {
      id: string,
      title: string,
      company: string,
      startDate: string,
      endDate: string
    },
    skills: string[]
  }[] = [];

  totalMonth: string | number = 0;
  totalYears: string | number = 0;

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

  openAddExpPopUp() {
    const dialogRef =  this.dialog.open(ExpPopupComponent,
      {
        width: '75rem',
        height: '50rem',
        data: { id: this.userId }
      }
      );
    dialogRef.afterClosed().subscribe(
      (data: ExpObj) => {
        this.experienceArray.push(data.result);
        console.log(this.experienceArray);
      }
    );
  }



  // calculateDuration(expItem) {
  //   this.totalDuration = 0;
  //   for (const item of this.experience.controls) {
  //     this.totalDuration += item.value.endDate.getMonth() - item.value.startDate.getMonth() +
  //       (12 * (item.value.endDate.getFullYear() - item.value.startDate.getFullYear()));
  //     if (expItem === item) {
  //       item.value.duration = expItem.value.endDate.getMonth() - expItem.value.startDate.getMonth() +
  //         (12 * (expItem.value.endDate.getFullYear() - expItem.value.startDate.getFullYear()));
  //     }
  //   }
  //   this.totalYears = angularMath.getNumberWithDecimals(this.totalDuration / 12, 0);
  //   this.totalMonth = angularMath.getNumberWithDecimals(this.totalDuration % 12, 0);
  // }
  //
  // currentExp(index) {
  //   this.currentIndex = index;
  // }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

}
