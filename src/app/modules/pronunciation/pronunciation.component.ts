import { Component, OnInit } from '@angular/core';
import {JavascriptLoaderService} from '../../services/javascript-loader.service';


@Component({
  selector: 'app-pronunciation',
  templateUrl: './pronunciation.component.html',
  styleUrls: ['./pronunciation.component.scss']
})
export class PronunciationComponent implements OnInit {

  jsFiles = [
    '../../../assets/js/jquery-3.2.1.min.js',
    '../../../assets/js/recorder.js',
    '../../../assets/js/callbackmanager.js',
    '../../../assets/js/volumemeter.js',
    '../../../assets/js/constants.js',
    '../../../assets/js/common.js',
    '../../../assets/js/recognizer.js',
    '../../../assets/js/proneval.js',
    '../../../assets/js/keras.js'
  ];

  constructor(private jsLoader: JavascriptLoaderService) { }

  ngOnInit() {
    this.jsLoader.loadScripts(this.jsFiles);
  }

}
