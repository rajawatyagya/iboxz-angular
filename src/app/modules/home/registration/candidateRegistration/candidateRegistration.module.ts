import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRegistrationRoutingModule } from './candidateRegistration-routing.module';
import { CandidateRegistrationComponent } from './candidateRegistration.component';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatCheckboxModule, MatDividerModule, MatAutocompleteModule, MatRadioModule
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
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    FormsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatRadioModule
  ],
 })
export class CandidateRegistrationModule { }
