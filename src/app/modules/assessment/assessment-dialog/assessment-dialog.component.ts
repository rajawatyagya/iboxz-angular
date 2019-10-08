import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AlinaComponent} from '../../alina/alina.component';

@Component({
  selector: 'app-assessment-dialog',
  templateUrl: './assessment-dialog.component.html',
  styleUrls: ['./assessment-dialog.component.scss']
})
export class AssessmentDialogComponent implements OnInit {

  @ViewChild('basicTimer', {static: false}) basicTimer;
  @ViewChild(AlinaComponent, {static: false}) alina: AlinaComponent;

  recording = false;

  private breakpoint: number;

  constructor() {}

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  setRecordingStatus(recording: boolean): void {
    this.recording = recording;
    this.basicTimer.start();
  }

  stopRecording() {
    this.recording = false;
    this.alina.stopRecoding();
    this.basicTimer.reset();
  }
}
