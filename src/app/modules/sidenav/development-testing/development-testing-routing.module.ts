import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DevelopmentTestingComponent} from './development-testing.component';
import {OnlyLoggedInUserGuard} from '../../../guards/only-logged-in-user.guard';


const routes: Routes = [
  {
    path: '',
    component: DevelopmentTestingComponent,
    canActivate: [OnlyLoggedInUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopmentTestingRoutingModule { }
