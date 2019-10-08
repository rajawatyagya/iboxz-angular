import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverviewService } from '../../services/overview.service';
import { ContactType, Feedback } from '../../shared/feedback';
import { TeamService } from '../../services/team.service';
import { Overview } from '../../shared/overview';
import { TeamMember } from '../../shared/teamMember';
import { flyInOut } from '../../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class HomeComponent implements OnInit {

  overviews: Overview[];
  members: TeamMember[];


  feedbackForm: FormGroup;  // form speech-services to host reactive form
  feedback: Feedback;  // corresponding data speech-services
  contactType = ContactType;
  @ViewChild('fform', { read: true, static: false }) feedbackFormDirective;  // to completely reset the value of the form


  constructor(private overviewService: OverviewService, private teamService: TeamService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.overviewService.getOverviews()
      .subscribe((overviews) => this.overviews = overviews);
    this.teamService.getMembers()
      .subscribe((members) => this.members = members);
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      telnum: ['', Validators.required],
      email: ['', Validators.required],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({  // resetting the form object to original
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    /* bcz the data speech-services and form speech-services have same structure hence,
     we can quickly load the current state of form via value, when user submits the form,
     if they are diff, then we need to map every single property within the function*/
    this.feedbackFormDirective.resetForm();
  }
}
