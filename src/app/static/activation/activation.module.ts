import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivationRoutingModule } from './activation-routing.module';
import { ActivationComponent } from './activation.component';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';


@NgModule({
  declarations: [ActivationComponent],
  imports: [
    CommonModule,
    ActivationRoutingModule,
    FlexModule,
    MatButtonModule
  ]
})
export class ActivationModule { }
