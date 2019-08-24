import { Injectable } from '@angular/core';
import { Profile } from '../shared/profile/profile';
import { PROFILES } from '../shared/profile/profiles';
import { Observable, of } from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  getProfiles(): Observable<Profile[]> {
    return of(PROFILES);
  }

  getProfile(id: number): Observable<Profile> {
    return of(PROFILES.filter((profile) => profile.id === id)[0]);
  }

}
