import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../shared/profile/profile';
import { flyInOut } from '../../animations/app.animation';
import { Education } from '../../shared/profile/education';
import { Experience } from '../../shared/profile/experience';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  education: Education[];
  experience: Experience[];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile(1)
      .subscribe((profile) => {this.profile = profile;
                               this.education = this.profile.education;
                               this.experience = this.profile.experience;
                               });
  }

}
