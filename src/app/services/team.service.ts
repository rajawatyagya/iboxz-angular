import { Injectable } from '@angular/core';
import { TeamMember } from '../shared/teamMember';
import { MEMBERS } from '../shared/teamMembers';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  getMembers(): TeamMember[] {
    return MEMBERS;
  }

  getMember(id: string): TeamMember {
    return MEMBERS.filter((member) => member.id === id)[0];
  }

  getFeaturedMember(): TeamMember {
    return MEMBERS.filter((member) => (member.featured))[0];
  }
}
