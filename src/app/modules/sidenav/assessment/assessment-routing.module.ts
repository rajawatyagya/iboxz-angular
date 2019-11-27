import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentComponent } from './assessment.component';
import {OnlyLoggedInUserGuard} from '../../../guards/only-logged-in-user.guard';


const routes: Routes = [
  {
    path: '',
    component: AssessmentComponent,
    canActivate: [OnlyLoggedInUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
