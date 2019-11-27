import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSlideToggleModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ExperienceComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule
  ]
})
export class ExperienceModule { }
