import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    if (this.cookieService.get('auth-token') !== null) {
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
