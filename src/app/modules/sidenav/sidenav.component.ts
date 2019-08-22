import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {width: '550px', height: '450px'});   // the component is supplied to act as the view of the dialog
  }

  sideNavToggle(sidenav) {
    sidenav.toggle();
  }

}
