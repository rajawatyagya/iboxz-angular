import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LanguageAssessmentRoutingModule } from './language-assessment-routing.module';
import { LanguageAssessmentComponent } from './language-assessment.component';
import {MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatIconModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {CdTimerModule} from 'angular-cd-timer';


@NgModule({
  declarations: [LanguageAssessmentComponent],
  exports: [
    LanguageAssessmentComponent
  ],
  imports: [
    CommonModule,
    LanguageAssessmentRoutingModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    FlexModule,
    MatButtonModule,
    MatDialogModule,
    CdTimerModule,
    MatGridListModule,
    MatIconModule
  ]
})
export class LanguageAssessmentModule { }
