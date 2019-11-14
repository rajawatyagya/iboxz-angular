import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DomainTestComponent} from './domain-test.component';


const routes: Routes = [
  {
    path: '',
    component: DomainTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainTestRoutingModule { }
