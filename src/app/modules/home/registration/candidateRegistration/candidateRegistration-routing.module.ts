import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CandidateRegistrationComponent} from './candidateRegistration.component';


const routes: Routes = [{
  path: '',
  component: CandidateRegistrationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRegistrationRoutingModule { }
