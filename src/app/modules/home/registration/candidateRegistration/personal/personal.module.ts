import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import {MatButtonModule, MatDatepickerModule, MatExpansionModule, MatInputModule, MatSelectModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [PersonalComponent],
  exports: [
    PersonalComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    FlexModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule
  ]
})
export class PersonalModule { }
