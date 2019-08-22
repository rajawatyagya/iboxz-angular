import { Injectable } from '@angular/core';
import { TeamMember } from '../shared/teamMember';
import { MEMBERS } from '../shared/teamMembers';
import { Observable, of } from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  getMembers(): Observable<TeamMember[]> {
    return of(MEMBERS);
  }

  getMember(id: string): Observable<TeamMember> {
    return of(MEMBERS.filter((member) => member.id === id)[0]);
  }

  getFeaturedMember(): Observable<TeamMember> {
    return of(MEMBERS.filter((member) => (member.featured))[0]);
  }
}
