import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './modules/home/home.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { AssessmentComponent } from './modules/assessment/assessment.component';
import { TestComponent } from './modules/test/test.component';
import { JobsComponent } from './modules/jobs/jobs.component';
import { ReferComponent } from './modules/refer/refer.component';
import { WalletComponent } from './modules/wallet/wallet.component';
import { CandidateRegistrationComponent } from './modules/registration/candidateRegistration/candidateRegistration.component';
import { EmployerRegistrationComponent } from './modules/registration/employer-registration/employer-registration.component';
import { AlinaComponent } from './modules/alina/alina.component';
import { JobPostingComponent } from './modules/jobs/job-posting/job-posting.component';
import { VideoChatComponent } from './modules/video-chat/video-chat.component';
import {PronunciationComponent} from './modules/pronunciation/pronunciation.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'assessment',
    component: AssessmentComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'jobs',
    component: JobsComponent,
    children: [
        {
          path: 'jobposting',
          component: JobPostingComponent
        }
    ]
  },
  {
    path: 'refer',
    component: ReferComponent
  },
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'candidateRegistration',
    component: CandidateRegistrationComponent
  },
  {
    path: 'employerRegistration',
    component: EmployerRegistrationComponent
  },
  {
    path: 'alina',
    component: AlinaComponent
  },
  {
    path: 'videoChat',
    component: VideoChatComponent
  },
  {
    path: 'pronunciation',
    component: PronunciationComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
