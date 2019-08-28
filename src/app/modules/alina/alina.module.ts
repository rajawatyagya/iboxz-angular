import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCardModule,
  MatExpansionModule} from '@angular/material';

import { ChatWindowComponent } from 'angular-ai-chat-bot/src/app/chat-window/chat-window.component';
import { ChatMsgComponent } from 'angular-ai-chat-bot/src/app/chat-msg/chat-msg.component';
import { ChatInputComponent } from 'angular-ai-chat-bot/src/app/chat-input/chat-input.component';

import { AlinaComponent } from './alina.component';
import { AlinaRoutingModule } from './alina-routing.module';
import { ChatBot } from 'angular-ai-chat-bot';

import {HttpClientModule} from '@angular/common/http';
import {DataService} from 'angular-ai-chat-bot/src/app/services/data.service';


@NgModule({
  declarations: [AlinaComponent,
                ChatBot,
                ChatWindowComponent,
                ChatMsgComponent,
                ChatInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    AlinaRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatExpansionModule
  ],
  exports: [AlinaComponent],
  providers: [DataService]
})
export class AlinaModule { }
