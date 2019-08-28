import { Component, OnInit } from '@angular/core';

import { Environment } from '../../shared/environment';
import { ChatService, Message} from '../../services/chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';


@Component({
  selector: 'app-chatbot',
  templateUrl: './alina.component.html',
  styleUrls: ['./alina.component.scss']
})
export class AlinaComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  scroller: any;

  constructor(private chat: ChatService) {
  }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
      .pipe(scan((acc, val) => acc.concat(val)));
  }

  sendMessage() {
    this.chat.converse(this.formValue).then(r => r);
    this.formValue = '';
  }
}
