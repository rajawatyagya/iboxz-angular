import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule, MatSelectModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [EducationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class EducationModule { }
