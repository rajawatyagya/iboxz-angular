import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import {FormsModule} from '@angular/forms';
import {RxSpeechRecognitionService} from '@kamiazya/ngx-speech-recognition';
import {SpeechSynthesisModule} from '@kamiazya/ngx-speech-synthesis';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {AlinaModule} from '../alina/alina.module';
import {CdTimerModule} from 'angular-cd-timer';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    SpeechSynthesisModule.forRoot({
      lang: 'en-US',
      volume: 1.0,
      pitch: 1.0,
      rate: 1.0,
    }),
    MatToolbarModule,
    MatCardModule,
    AlinaModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CdTimerModule,
    MatGridListModule,
    FlexModule,
  ],
  providers: [RxSpeechRecognitionService]
})
export class TestModule { }
