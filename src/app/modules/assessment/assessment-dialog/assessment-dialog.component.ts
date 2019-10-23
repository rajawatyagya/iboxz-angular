import {Component, EventEmitter, Input, OnInit, Output, Type, ViewChild} from '@angular/core';
import {AlinaComponent} from '../../alina/alina.component';
import {MatDialogRef} from '@angular/material';
import {DomainTestComponent} from '../../domain-test/domain-test.component';
import {LanguageAssessmentComponent} from '../../language-assessment/language-assessment.component';

@Component({
  selector: 'app-assessment-dialog',
  templateUrl: './assessment-dialog.component.html',
  styleUrls: ['./assessment-dialog.component.scss']
})
export class AssessmentDialogComponent implements OnInit {

  @ViewChild(AlinaComponent, {static: false}) alina: AlinaComponent;
  @ViewChild(LanguageAssessmentComponent, {static: false}) lang: LanguageAssessmentComponent;

  assessComponents = [
    {
      name: 'domain-domain-test-component',
      component: DomainTestComponent
    },
    {
      name: 'lang-assess-component',
      component: LanguageAssessmentComponent
    }
  ];

  private breakpoint: number;
  selectedComponent = {};

  constructor(private dialogRef: MatDialogRef<AssessmentDialogComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
  }

  selectComponent($event) {
    this.selectedComponent = this.assessComponents.find($event);
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }
}
