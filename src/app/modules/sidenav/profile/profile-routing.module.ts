import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile.component';
import {OnlyLoggedInUserGuard} from '../../../guards/only-logged-in-user.guard';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [OnlyLoggedInUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
