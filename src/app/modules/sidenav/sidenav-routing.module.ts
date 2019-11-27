import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { DomainTestComponent } from './assessment/assessment-dialog/domain-test/domain-test.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobPostingComponent } from './jobs/job-posting/job-posting.component';
import { ReferComponent } from './refer/refer.component';
import { WalletComponent } from './wallet/wallet.component';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { DevelopmentTestingComponent } from './development-testing/development-testing.component';
import {PageNotFoundComponent} from '../../static/page-not-found/page-not-found.component';
import {OnlyLoggedInUserGuard} from '../../guards/only-logged-in-user.guard';


const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
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
        component: DomainTestComponent
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
        path: 'videoChat',
        component: VideoChatComponent,
        canActivate: [OnlyLoggedInUserGuard]
      },
      {
        path: 'testing',
        component: DevelopmentTestingComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
