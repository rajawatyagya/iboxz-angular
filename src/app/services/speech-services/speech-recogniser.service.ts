import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SpeechNotification} from './speech-notification';
import { SpeechError } from './speech-error';

import { AppWindow } from './app-window';
const { webkitSpeechRecognition }: AppWindow = window as AppWindow;

@Injectable({
  providedIn: 'root'
})
export class SpeechRecogniserService {
  recognition: any;
  ignoreOnEnd: boolean;
  language: string;

  constructor() {}

  initialize(language: string): void {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = language;
  }

  setLanguage(language: string) {
    this.recognition.lang = language;
  }

  start() {
    this.recognition.start();
  }

  onStart(): Observable<SpeechNotification> {
    if (!this.recognition) {
      this.initialize(this.language);
    }

    return new Observable(observer => {
      this.recognition.onstart = () => {
        observer.next({
          info: 'info_speak_now'
        });
      };
    });
  }

  onEnd(): Observable<SpeechNotification> {
    return new Observable(observer => {
      this.recognition.onend = () => {
        if (this.ignoreOnEnd) {
          return;
        }

        observer.next({
          info: 'info_start'
        });
      };
    });
  }

  onResult(): Observable<SpeechNotification> {
    return new Observable(observer => {
      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        observer.next({
          info: 'final_transcript',
          content: finalTranscript
        });
        observer.next({
          info: 'interim_transcript',
          content: interimTranscript
        });
      };
    });
  }

  onError(): Observable<SpeechNotification> {
    return new Observable(observer => {
      this.recognition.onerror = (event) => {
        let result: SpeechError;
        if (event.error === 'no-speech-services') {
          result = SpeechError.NO_SPEECH;
          this.ignoreOnEnd = true;
        }
        if (event.error === 'audio-capture') {
          result = SpeechError.NO_MICROPHONE;
          this.ignoreOnEnd = true;
        }
        if (event.error === 'not-allowed') {
          result = SpeechError.NOT_ALLOWED;
          this.ignoreOnEnd = true;
        }
        if (event.error === 'blocked') {
          result = SpeechError.BLOCKED;
        }
        observer.next({
          error: result
        });
      };
    });
  }

  stop() {
    this.recognition.stop();
  }
}
