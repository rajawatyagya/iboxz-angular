import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployerRegistrationComponent } from './employer-registration.component';
import {OnlyLoggedInUserGuard} from '../../../../guards/only-logged-in-user.guard';


const routes: Routes = [
  {
    path: '',
    component: EmployerRegistrationComponent,
    canActivate: [OnlyLoggedInUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRegistrationRoutingModule { }
