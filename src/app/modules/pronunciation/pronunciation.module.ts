import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PronunciationRoutingModule } from './pronunciation-routing.module';
import { PronunciationComponent } from './pronunciation.component';


@NgModule({
  declarations: [PronunciationComponent],
  imports: [
    CommonModule,
    PronunciationRoutingModule
  ]
})
export class PronunciationModule { }
