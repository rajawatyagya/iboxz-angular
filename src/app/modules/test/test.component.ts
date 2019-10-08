import {ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {SpeechNotification} from '../../services/speech-services/speech-notification';
import {SpeechError} from '../../services/speech-services/speech-error';
import {SpeechRecogniserService} from '../../services/speech-services/speech-recogniser.service';
import {SpeechSynthesisService, SpeechSynthesisUtteranceFactoryService} from '@kamiazya/ngx-speech-synthesis';
import {QUESTIONS} from '../../shared/questions';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('basicTimer', {static: false}) basicTimer;
  finalTranscript = '';
  recognizing = false;
  intentionalPause: boolean;
  notification: string;
  languages: string[] =  ['en-US', 'es-ES', 'en-IN'];
  currentLanguage: string;
  recording = false;
  questionNumber: number;
  questions = QUESTIONS;

  responseSet = [];

  constructor(private changeDetector: ChangeDetectorRef,
              private speechRecognizer: SpeechRecogniserService,
              public f: SpeechSynthesisUtteranceFactoryService,
              public svc: SpeechSynthesisService) { }

  ngOnInit() {
    this.currentLanguage = this.languages[0];
    this.speechRecognizer.initialize(this.currentLanguage);
    this.initRecognition();
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  askQuestion() {
    this.questionNumber = Math.floor(Math.random() * this.questions.length);
    const question = this.questions[this.questionNumber];
    this.delay(1050).then(() => {
      this.svc.speak(this.f.text(question));
    });
    this.delay(10000).then(() => {
      if (this.recognizing) {
        this.speechRecognizer.stop();
        this.speechRecognizer.start();
      } else { this.speechRecognizer.start(); }
      if (this.basicTimer) {
        this.basicTimer.reset();
        this.basicTimer.start();
      } else {this.basicTimer.start(); }
      }
    );
  }

  startButton() {
    if (this.recognizing) {
      this.speechRecognizer.stop();
      this.pauseRecognition();
      return;
    }
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
        this.intentionalPause = false;
        this.notification = 'I\'m listening...';
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
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  pauseRecognition() {
    if (this.recognizing) {
      this.intentionalPause = true;
      this.speechRecognizer.stop();
      this.recording = false;
    }
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }

  stopRecording() {
    this.recording = false;
    this.intentionalPause = true;
    this.speechRecognizer.stop();
    this.basicTimer.reset();
    this.notification = null;
    this.detectChanges();
  }
}
