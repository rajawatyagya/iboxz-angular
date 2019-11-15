import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule, MatRadioModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
