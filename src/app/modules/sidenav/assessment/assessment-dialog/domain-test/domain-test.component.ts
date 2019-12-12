import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { SpeechNotification } from '../../../../../services/speech-services/speech-notification';
import { SpeechError } from '../../../../../services/speech-services/speech-error';
import { SpeechRecogniserService } from '../../../../../services/speech-services/speech-recogniser.service';
import { SpeechSynthesisService, SpeechSynthesisUtteranceFactoryService} from '@kamiazya/ngx-speech-synthesis';
import { ToastrService } from 'ngx-toastr';


import { QUESTIONS } from '../../../../../shared/questions';
import { Language, LANGUAGES } from '../../../../../shared/Language';


@Component({
  selector: 'app-domain-test',
  templateUrl: './domain-test.component.html',
  styleUrls: ['./domain-test.component.scss']
})
export class DomainTestComponent implements OnInit {

  @ViewChild('basicTimer', {static: false}) basicTimer;
  @ViewChild('universalTimer', {static: false}) universalTimer;
  finalTranscript = '';
  recognizing = false;
  intentionalPause: boolean;
  notification: string;
  languages: Language[] =  LANGUAGES;
  currentLanguage: Language;
  questionNumber: number;
  questions = QUESTIONS;
  responseSet = [];
  buttonBool = false;
  timerCompleted = false;
  nextTest = ''

  constructor(private changeDetector: ChangeDetectorRef,
              private speechRecognizer: SpeechRecogniserService,
              private alertService: ToastrService,
              public f: SpeechSynthesisUtteranceFactoryService,
              public svc: SpeechSynthesisService,
  ) {}

  ngOnInit() {
    this.currentLanguage = this.getLanguage('English (India)');
    this.speechRecognizer.initialize(this.currentLanguage.code);
    this.initRecognition();
    this.f.onend = () => {
      this.startRecording();
    };
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  startAssessment() {
    this.askQuestion();
    this.universalTimer.start();
  }

  askQuestion() {
    this.questionNumber = Math.floor(Math.random() * this.questions.length);
    const question = this.questions[this.questionNumber];
    this.toggleNextButton(true);
    this.delay(1050).then(() => {
      this.voiceOutput(question);
      this.notification = null;
    });
  }

  onSelectLanguage(language: Language) {
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage.code);
  }

  getLanguage(langName: string): Language {
    return this.languages.filter(value => value.name === langName)[0];
  }

  private initRecognition() {
    this.speechRecognizer.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.intentionalPause = false;
        this.notification = 'I\'m listening...';
        this.showNotification(this.notification);
        this.detectChanges();
      });

    this.speechRecognizer.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        if (this.intentionalPause === false) {
          console.log('Ended unintentionally');
          this.speechRecognizer.start();
          this.detectChanges();
          return;
        }
        this.detectChanges();
        this.notification = null;
        this.responseSet.push({
          question: this.questions[this.questionNumber],
          answer: this.finalTranscript
        });
        this.finalTranscript = '';
        console.log(this.responseSet);
      });

    this.speechRecognizer.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript} ${message}`;
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

  voiceOutput(messageToSpeak: string) {
    this.svc.speak(this.f.text(messageToSpeak));
  }

  startRecording() {
    if (!this.recognizing) {
       this.speechRecognizer.start(); }
    if (this.basicTimer) {
      this.basicTimer.reset();
      this.basicTimer.start();
    } else {this.basicTimer.start(); }
  }

  pauseRecognition() {
    if (this.recognizing) {
      this.intentionalPause = true;
      this.toggleNextButton(false);
      this.notification = null;
      this.speechRecognizer.stop();
    }
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }

  stopRecording() {
    this.pauseRecognition();
    this.basicTimer.reset();
    this.detectChanges();
  }

  showNotification(notification: string) {
    this.alertService.success(notification, 'Alina:');
  }

  toggleNextButton(disabled: boolean) {
    this.buttonBool = disabled;
  }

  submitResponse() {
    // TODO implementation of submit
    console.log(this.responseSet);
  }
}
