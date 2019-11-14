import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentRoutingModule } from './assessment-routing.module';
import {AssessmentComponent} from './assessment.component';
import {MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import { AssessmentDialogComponent } from './assessment-dialog/assessment-dialog.component';
import {AlinaModule} from '../alina/alina.module';
import {CdTimerModule} from 'angular-cd-timer';
import {DomainTestModule} from './assessment-dialog/domain-test/domain-test.module';
import {LanguageAssessmentModule} from './assessment-dialog/language-assessment/language-assessment.module';
import {AssessmentDialogModule} from './assessment-dialog/assessment-dialog.module';


@NgModule({
  declarations: [AssessmentComponent],
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
    DomainTestModule,
    LanguageAssessmentModule,
    AssessmentDialogModule
  ],
  entryComponents: [AssessmentDialogComponent]
})
export class AssessmentModule { }
