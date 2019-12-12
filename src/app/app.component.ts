import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Title} from '@angular/platform-browser';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public version: string;
  private title: Title;
  authentication = false;

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    const authToken = this.cookieService.get('auth-token');
    if (authToken) {
      this.authentication = true;
    }
    this.version = environment.version; // <-- Consume the version number from environment!
    this.title.setTitle(`iboxz v${this.version}`); // <-- Also, show the version number in the title.
  }
}
