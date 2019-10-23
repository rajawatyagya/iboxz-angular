import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {Language, LANGUAGES} from '../../shared/Language';
import {SpeechRecogniserService} from '../../services/speech-services/speech-recogniser.service';
import {SpeechSynthesisService, SpeechSynthesisUtteranceFactoryService} from '@kamiazya/ngx-speech-synthesis';
import {AudioRecordingService} from '../../services/audio-recording.service';

import { LANG_ASSESS_PARA } from '../../shared/questions';
import {ApiService} from '../../services/api.service';
import {HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup} from '@angular/forms';

interface TokenObject {
  token: string;
}

@Component({
  selector: 'app-language-assessment',
  templateUrl: './language-assessment.component.html',
  styleUrls: ['./language-assessment.component.scss']
})
export class LanguageAssessmentComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('rohit'),
    password: new FormControl('rohit')
  });

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('universalTimer', {static: false}) universalTimer;
  start = false;
  languages: Language[] =  LANGUAGES;
  currentLanguage: Language;
  assessmentParas = LANG_ASSESS_PARA;
  recording = false;
  nextTest = 'domain-domain-test-component';
  audioFile: any;
  header;

  alinaInstructions = 'Please read the passage carefully and loudly.';

  constructor(
    private speechRecognizer: SpeechRecogniserService,
    public f: SpeechSynthesisUtteranceFactoryService,
    public audioRecorder: AudioRecordingService,
    public svc: SpeechSynthesisService,
    private apiService: ApiService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.currentLanguage = this.getLanguage('English (India)');
    this.loginUser();
    this.f.onend = () => {
      this.recording = true;
      this.universalTimer.start();
      this.audioRecorder.startRecording();
    };
  }

  onSelectLanguage(language: Language) {
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage.code);
  }

  getLanguage(langName: string): Language {
    return this.languages.filter(value => value.name === langName)[0];
  }

  submitResponse() {
    // TODO implementation of submit
    this.audioRecorder.stopRecording();
    this.audioRecorder.getRecordedBlob().subscribe(
      data => {
        this.audioFile = data.blob;
        const fb = new FormData();
        fb.append('audio', this.audioFile);
        this.saveAudio(fb);
      }
    );
    this.action.emit(this.nextTest);
    console.log(this.audioFile);
  }

  voiceOutput(messageToSpeak: string) {
    this.svc.speak(this.f.text(messageToSpeak));
  }

  startAssessment() {
    this.start = true;
    this.voiceOutput(this.alinaInstructions);
  }

  saveAudio(data) {
    this.apiService.saveAudioFile(data).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  // for testing
  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: TokenObject) => {
        this.cookieService.set('auth-token', result.token);
      },
      error => {
        console.log(error);
      }
    );
  }
}
