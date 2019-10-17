import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import {AssessmentComponent} from './assessment.component';
import {MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import { AssessmentDialogComponent } from './assessment-dialog/assessment-dialog.component';
import {AlinaModule} from '../alina/alina.module';
import {CdTimerModule} from 'angular-cd-timer';
import {TestModule} from '../test/test.module';


@NgModule({
  declarations: [AssessmentComponent, AssessmentDialogComponent],
  imports: [
    CommonModule,
    AssessmentRoutingModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    MatGridListModule,
    AlinaModule,
    CdTimerModule,
    MatDialogModule,
    TestModule
  ],
  entryComponents: [AssessmentDialogComponent]
})
export class AssessmentModule { }
