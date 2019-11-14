import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerRegistrationComponent } from './employer-registration.component';


const routes: Routes = [
  {
    path: '',
    component: EmployerRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRegistrationRoutingModule { }
