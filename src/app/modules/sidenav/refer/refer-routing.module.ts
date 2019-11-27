import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReferComponent} from './refer.component';
import {WalletComponent} from '../wallet/wallet.component';
import {OnlyLoggedInUserGuard} from '../../../guards/only-logged-in-user.guard';


const routes: Routes = [
  {
    path: '',
    component: ReferComponent,
    canActivate: [OnlyLoggedInUserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferRoutingModule { }
