import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlinaComponent } from './alina.component';


const routes: Routes = [
  {
    path: '',
    component: AlinaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlinaRoutingModule { }
