import { Component, OnInit } from '@angular/core';
import {AudioRecordingService} from '../../services/audio-recording.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-pronunciation',
  templateUrl: './pronunciation.component.html',
  styleUrls: ['./pronunciation.component.scss']
})
export class PronunciationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
