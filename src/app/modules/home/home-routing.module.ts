import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import {CandidateRegistrationComponent} from './registration/candidateRegistration/candidateRegistration.component';
import {EmployerRegistrationComponent} from './registration/employer-registration/employer-registration.component';
import {PageNotFoundComponent} from '../../static/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'candidateRegistration',
    component: CandidateRegistrationComponent
  },
  {
    path: 'employerRegistration',
    component: EmployerRegistrationComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
