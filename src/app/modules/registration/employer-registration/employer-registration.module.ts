import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRegistrationRoutingModule } from './employer-registration-routing.module';
import { EmployerRegistrationComponent } from './employer-registration.component';


@NgModule({
  declarations: [EmployerRegistrationComponent],
  imports: [
    CommonModule,
    EmployerRegistrationRoutingModule
  ]
})
export class EmployerRegistrationModule { }
