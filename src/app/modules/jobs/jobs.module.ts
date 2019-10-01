import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';

import { JobPostingModule } from './job-posting/job-posting.module';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';


@NgModule({
  declarations: [JobsComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    JobPostingModule,
    FlexModule,
    MatButtonModule
  ]
})
export class JobsModule { }
