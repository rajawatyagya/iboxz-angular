import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlinaComponent } from './alina.component';
import { AlinaRoutingModule } from './alina-routing.module';

import { ChatService } from '../../services/chat.service';


@NgModule({
  declarations: [AlinaComponent],
  imports: [
    CommonModule,
    AlinaRoutingModule,
    FormsModule
  ],
  exports: [AlinaComponent],
  providers: [ChatService]
})
export class AlinaModule { }
