import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule} from '@angular/material';
import { FlexModule } from '@angular/flex-layout';

import { JobPostingComponent } from './job-posting.component';



@NgModule({
  declarations: [JobPostingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class JobPostingModule { }
