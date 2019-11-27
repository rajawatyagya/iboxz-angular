import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    FlexModule,
    MatButtonModule,
    RouterModule
  ]
})
export class PageNotFoundModule { }
