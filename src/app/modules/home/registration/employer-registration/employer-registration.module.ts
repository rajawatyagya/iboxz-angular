import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRegistrationRoutingModule } from './employer-registration-routing.module';
import { EmployerRegistrationComponent } from './employer-registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule, MatCardModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatInputModule} from '@angular/material';


@NgModule({
  declarations: [EmployerRegistrationComponent],
  imports: [
    CommonModule,
    EmployerRegistrationRoutingModule,
    ReactiveFormsModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule
  ]
})
export class EmployerRegistrationModule { }
