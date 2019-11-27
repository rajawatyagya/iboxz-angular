import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /*providers: [
    {
      provide: Pitch,
      useValue: 1,
    },
    {
      provide: Rate,
      useValue: 0.9,
    },
    {
      provide: Voice,
      useValue: 'Kyoko',
    },
  ],*/
})
export class AppComponent implements OnInit {
  title = 'iboxz';

  authentication = false;

  constructor(
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    const authToken = this.cookieService.get('auth-token');
    if (authToken) {
      this.authentication = true;
    }
  }
}
