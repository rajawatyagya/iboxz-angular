import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import {CandidateRegistrationComponent} from './registration/candidateRegistration/candidateRegistration.component';
import {EmployerRegistrationComponent} from './registration/employer-registration/employer-registration.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'candidateRegistration',
    component: CandidateRegistrationComponent,
  },
  {
    path: 'employerRegistration',
    component: EmployerRegistrationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
