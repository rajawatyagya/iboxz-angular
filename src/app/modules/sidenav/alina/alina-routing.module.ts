import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlinaComponent } from './alina.component';
import {OnlyLoggedInUserGuard} from '../../../guards/only-logged-in-user.guard';


const routes: Routes = [
  {
    path: '',
    component: AlinaComponent,
    canActivate: [OnlyLoggedInUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlinaRoutingModule { }
