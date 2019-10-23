import { Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {

  private stream;
  private recorder;
  private interval;
  private startTime;
  private recorded = new Subject<any>();
  private recordingTime = new Subject<string>();
  private recordingFailed = new Subject<string>();

  constructor() { }


  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this.recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this.recordingTime.asObservable();
  }

  recordingFailedFun(): Observable<string> {
    return this.recordingFailed.asObservable();
  }

  startRecording() {

    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this.recordingTime.next('00:00');
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
      this.stream = s;
      this.record();
    }).catch(error => {
      this.recordingFailed.next();
    });
  }

  private record() {

    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      // audioBitsPerSecond: 19200,
      // desiredSampRate: 48 * 1000,
      // bufferSize: 4096
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
        this.recordingTime.next(time);
      },
      1000
    );
  }

  private toString(value) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  stopRecording() {

    if (this.recorder) {
      this.recorder.stop((blob) => {
        if (this.startTime) {
          const wavName = encodeURIComponent('audio_' + new Date().getTime() + '.wav');
          this.stopMedia();
          this.recorded.next({ blob, title: wavName });
        }
      }, () => {
        this.stopMedia();
        this.recordingFailed.next();
      });
    }

  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }

  abortRecording() {
    this.stopMedia();
  }

}
