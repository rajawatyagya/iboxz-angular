import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    if (this.auth.isUserAuthenticated()) {
      /*this.router.navigate([{
        outlets: {
          sidenavOutlet: ['dashboard']
        }}], {
        relativeTo: this.route
      });*/
    }
  }

  sideNavToggle(sidenav) {
    sidenav.toggle();
  }

  isLargeScreen(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 720;
  }

}
