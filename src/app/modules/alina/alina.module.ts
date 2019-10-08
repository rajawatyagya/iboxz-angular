import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlinaComponent } from './alina.component';
import { AlinaRoutingModule } from './alina-routing.module';

import { ChatService } from '../../services/chat.service';
import {SpeechRecogniserService} from '../../services/speech-services/speech-recogniser.service';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';


@NgModule({
  declarations: [AlinaComponent],
  imports: [
    CommonModule,
    AlinaRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [AlinaComponent],
  providers: [
    ChatService,
    SpeechRecogniserService
  ]
})
export class AlinaModule { }
