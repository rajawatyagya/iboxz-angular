import {ChangeDetectorRef, Injectable} from '@angular/core';
import { Environment } from '../shared/environment';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {SpeechSynthesisService, SpeechSynthesisUtteranceFactoryService} from '@kamiazya/ngx-speech-synthesis';

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

  constructor(public f: SpeechSynthesisUtteranceFactoryService,
              public svc: SpeechSynthesisService,
              ) { }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  // Adds message to source
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        this.svc.speak(this.f.text('')); // to initialize speech-services synthesiser (it takes 1 sec )
        this.delay(1090).then(() => {
          console.log(speech);
          this.svc.speak(this.f.text(speech));
          const botMessage = new Message(speech, 'bot');
          this.update(botMessage);
        });
      });
  }
}
