import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { ChatService, Message} from '../../services/chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { SpeechRecogniserService } from '../../services/speech-services/speech-recogniser.service';
import { SpeechNotification } from '../../services/speech-services/speech-notification';
import { SpeechError } from '../../services/speech-services/speech-error';


@Component({
  selector: 'app-chatbot',
  templateUrl: './alina.component.html',
  styleUrls: ['./alina.component.scss']
})
export class AlinaComponent implements OnInit {

  @Output() startTimeEvent: EventEmitter<any> = new EventEmitter<any>();

  finalTranscript = '';
  recognizing = false;
  notification: string;
  languages: string[] =  ['en-IN', 'en-US', 'en-UK', 'hi-IN'];
  currentLanguage: string;

  messages: Observable<Message[]>;
  formValue: string;
  scroller: any;
  errorMsg: string;

  constructor(
    private chat: ChatService,
    private changeDetector: ChangeDetectorRef,
    private speechRecognizer: SpeechRecogniserService
  ) {
  }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
      .pipe(scan((acc, val) => {
        return acc.concat(val);
      }));
    this.currentLanguage = this.languages[0];
    this.speechRecognizer.initialize(this.currentLanguage);
    this.initRecognition();
    this.notification = null;
  }

  startButton() {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      this.startTimeEvent.emit(false);
      return;
    }
    this.startTimeEvent.emit(true);
    this.speechRecognizer.start();
  }

  onSelectLanguage(language: string) {
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.notification = 'I\'m listening...';
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        this.finalTranscript = '';
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${message}`;
          this.sendMessage(this.finalTranscript);
          this.detectChanges();
        }
      });

    this.speechRecognizer.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Please verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  stopRecoding() {
    this.speechRecognizer.stop();
    this.detectChanges();
    this.startTimeEvent.emit(false);
    return;
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }

  sendMessage(message: string) {
    this.chat.converse(message).then(r => r);
  }

  sendStartMessage() {
    this.formValue = 'start';
    this.chat.converse(this.formValue).then(r => r);
    this.formValue = '';
  }
}
