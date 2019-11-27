import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WalletComponent} from './wallet.component';
import {OnlyLoggedInUserGuard} from '../../../guards/only-logged-in-user.guard';


const routes: Routes = [
  {
    path: '',
    component: WalletComponent,
    canActivate: [OnlyLoggedInUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
