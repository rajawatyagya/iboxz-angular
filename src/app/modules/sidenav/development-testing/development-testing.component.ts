import { Component, OnInit } from '@angular/core';
import {AudioRecordingService} from '../../../services/audio-recording.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SpeechSynthesisService} from '@kamiazya/ngx-speech-synthesis';

@Component({
  selector: 'app-development-testing',
  templateUrl: './development-testing.component.html',
  styleUrls: ['./development-testing.component.scss']
})
export class DevelopmentTestingComponent implements OnInit {
  isRecording = false;
  recordedTime;
  blobUrl;

  constructor(private audioRecordingService: AudioRecordingService,
              private sanitizer: DomSanitizer,
              public svc: SpeechSynthesisService,) {

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  getVoices() {
    return this.svc.getVoices();
  }

  ngOnInit(): void {
  }
}
