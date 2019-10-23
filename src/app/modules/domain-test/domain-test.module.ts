import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomainTestRoutingModule } from './domain-test-routing.module';
import { DomainTestComponent } from './domain-test.component';
import {FormsModule} from '@angular/forms';
import {RxSpeechRecognitionService} from '@kamiazya/ngx-speech-recognition';
import {SpeechSynthesisModule} from '@kamiazya/ngx-speech-synthesis';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {AlinaModule} from '../alina/alina.module';
import {CdTimerModule} from 'angular-cd-timer';
import {FlexModule} from '@angular/flex-layout';
import {TranslatorModule} from 'angular-translator';


@NgModule({
  declarations: [DomainTestComponent],
  imports: [
    CommonModule,
    DomainTestRoutingModule,
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
    TranslatorModule.forRoot({
      defaultLanguage: 'ru',
      providedLanguages: ['de', 'en', 'ru'],
      detectLanguage: false
    }),
    MatDialogModule,
  ],
  exports: [
    DomainTestComponent
  ],
  providers: [RxSpeechRecognitionService]
})
export class DomainTestModule { }
