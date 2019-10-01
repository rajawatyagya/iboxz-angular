import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

import {AssessmentDialogComponent} from './assessment-dialog/assessment-dialog.component';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openAssessmentDialog() {
    this.dialog.open(AssessmentDialogComponent, {width: '1200px', height: '900px'});
    // the component is supplied to act as the view of the dialog
  }

}
