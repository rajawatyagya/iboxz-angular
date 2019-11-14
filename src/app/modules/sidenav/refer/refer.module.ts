import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferRoutingModule } from './refer-routing.module';
import { ReferComponent } from './refer.component';


@NgModule({
  declarations: [ReferComponent],
  imports: [
    CommonModule,
    ReferRoutingModule
  ]
})
export class ReferModule { }
