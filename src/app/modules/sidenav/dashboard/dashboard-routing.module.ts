import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {OnlyLoggedInUserGuard} from '../../../guards/only-logged-in-user.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [OnlyLoggedInUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
