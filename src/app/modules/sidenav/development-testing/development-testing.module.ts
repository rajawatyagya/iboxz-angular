import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopmentTestingRoutingModule } from './development-testing-routing.module';
import {DevelopmentTestingComponent} from './development-testing.component';


@NgModule({
  declarations: [DevelopmentTestingComponent],
  imports: [
    CommonModule,
    DevelopmentTestingRoutingModule
  ]
})
export class DevelopmentTestingModule { }
