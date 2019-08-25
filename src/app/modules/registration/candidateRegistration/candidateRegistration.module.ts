import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRegistrationRoutingModule } from './candidateRegistration-routing.module';
import { CandidateRegistrationComponent } from './candidateRegistration.component';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule, MatCardModule
} from '@angular/material';


@NgModule({
  declarations: [CandidateRegistrationComponent],
  imports: [
    CommonModule,
    CandidateRegistrationRoutingModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ]
})
export class CandidateRegistrationModule { }
