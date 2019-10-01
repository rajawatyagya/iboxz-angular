import { Injectable } from '@angular/core';
import { Environment } from '../shared/environment';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  readonly token = Environment.dialogFlow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  constructor() { }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  // Adds message to source
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        const botMessage = new Message(speech, 'bot');
        this.update(botMessage);
      });
  }
}
