import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'profile',
    loadChildren: './modules/profile/profile.module#ProfileModule'
  },
  {
    path: 'assessment',
    loadChildren: './modules/assessment/assessment.module#AssessmentModule'
  },
  {
    path: 'interviews',
    loadChildren: './modules/interviews/interviews.module#InterviewsModule'
  },
  {
    path: 'jobs',
    loadChildren: './modules/jobs/jobs.module#JobsModule'
  },
  {
    path: 'refer',
    loadChildren: './modules/refer/refer.module#ReferModule'
  },
  {
    path: 'wallet',
    loadChildren: './modules/wallet/wallet.module#WalletModule'
  },
  {
    path: 'candidateRegistration',
    loadChildren: './modules/registration/candidateRegistration/candidateRegistration.module#CandidateRegistrationModule'
  },
  {
    path: 'employerRegistration',
    loadChildren: './modules/registration/employer-registration/employer-registration.module#EmployerRegistrationModule'
  },
  {
    path: 'alina',
    loadChildren: './modules/alina/alina.module#AlinaModule'
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
