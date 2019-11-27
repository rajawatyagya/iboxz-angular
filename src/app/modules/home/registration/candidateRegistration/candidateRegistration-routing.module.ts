import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CandidateRegistrationComponent} from './candidateRegistration.component';
import {OnlyLoggedInUserGuard} from '../../../../guards/only-logged-in-user.guard';


const routes: Routes = [{
  path: '',
  component: CandidateRegistrationComponent,
  canActivate: [OnlyLoggedInUserGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRegistrationRoutingModule { }
