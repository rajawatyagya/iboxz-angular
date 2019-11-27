import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs.component';
import {OnlyLoggedInUserGuard} from '../../../guards/only-logged-in-user.guard';



const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    canActivate: [OnlyLoggedInUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
