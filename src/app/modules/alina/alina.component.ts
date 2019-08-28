import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatBot } from 'angular-ai-chat-bot';
import { Subject, Observable } from 'rxjs';

import { Environment } from '../../shared/environment';


@Component({
  selector: 'app-chatbot',
  templateUrl: './alina.component.html',
  styleUrls: ['./alina.component.scss']
})
export class AlinaComponent implements OnInit {

  public accessToken = Environment.dialogFlow.angularBot;
  public msg: Subject<any> = new Subject();
  public msgArray: Observable<Array<any>> = new Observable<Array<any>>();

  constructor() {
  }

  public onChange(target: any) {
    this.msg.next(target.value);
    target.value = '';
  }

  public onMsgReceive(msg: string) { }

  ngOnInit() {
  }
}
