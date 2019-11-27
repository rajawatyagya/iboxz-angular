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
  MatCheckboxModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';
import {AddressModule} from './address/address.module';
import {ExperienceModule} from './experience/experience.module';
import {EducationModule} from './education/education.module';
import {PersonalModule} from './personal/personal.module';


@NgModule({
  declarations: [CandidateRegistrationComponent],
  imports: [
    AddressModule,
    ExperienceModule,
    EducationModule,
    PersonalModule,
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
    MatRadioModule,
    MatListModule,
    MatSidenavModule
  ]
})
export class CandidateRegistrationModule { }
