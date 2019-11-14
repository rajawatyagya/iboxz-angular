import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssessmentDialogComponent} from './assessment-dialog.component';
import {LanguageAssessmentModule} from './language-assessment/language-assessment.module';
import {LanguageAssessmentComponent} from './language-assessment/language-assessment.component';
import {DomainTestComponent} from './domain-test/domain-test.component';
import {FlexModule} from '@angular/flex-layout';
import {NgxdModule} from '@ngxd/core';



@NgModule({
  declarations: [AssessmentDialogComponent],
  imports: [
    CommonModule,
    LanguageAssessmentModule,
    FlexModule,
    NgxdModule
  ],
  entryComponents: [
    LanguageAssessmentComponent,
    DomainTestComponent]
})
export class AssessmentDialogModule { }
