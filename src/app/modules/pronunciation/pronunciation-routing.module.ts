import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PronunciationComponent} from './pronunciation.component';


const routes: Routes = [
  {
    path: '',
    component: PronunciationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PronunciationRoutingModule { }
