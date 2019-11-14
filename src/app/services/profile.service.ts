import { Injectable } from '@angular/core';
import { Profile } from '../shared/profile/profile';
import { PROFILES } from '../shared/profile/profiles';
import { Observable, of } from 'rxjs';
import {delay} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private cookieService: CookieService
  ) { }

  getProfiles(): Observable<Profile[]> {
    return of(PROFILES);
  }

  getProfile(): Observable<Profile> {
    const username = this.cookieService.get('username');
    return of(PROFILES.filter((profile) => profile.id === 1)[0]);
  }

}
