import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AlinaComponent} from '../../alina/alina.component';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-assessment-dialog',
  templateUrl: './assessment-dialog.component.html',
  styleUrls: ['./assessment-dialog.component.scss']
})
export class AssessmentDialogComponent implements OnInit {

  @ViewChild(AlinaComponent, {static: false}) alina: AlinaComponent;

  private breakpoint: number;

  constructor(private dialogRef: MatDialogRef<AssessmentDialogComponent>) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }
}
