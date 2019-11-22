import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import 'hammerjs';

import { NgxdModule } from '@ngxd/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavModule } from './modules/sidenav/sidenav.module';
import { AlinaModule } from './modules/sidenav/alina/alina.module';
import { LoginComponent } from './modules/home/login/login.component';
import { LoginModule } from './modules/home/login/login.module';
import { RegisterModule } from './modules/home/register/register.module';
import { RegisterComponent } from './modules/home/register/register.component';
import { AssessmentModule } from './modules/sidenav/assessment/assessment.module';
import { DashboardModule } from './modules/sidenav/dashboard/dashboard.module';
import { HomeModule } from './modules/home/home.module';
import { DomainTestModule } from './modules/sidenav/assessment/assessment-dialog/domain-test/domain-test.module';
import { JobsModule } from './modules/sidenav/jobs/jobs.module';
import { CandidateRegistrationModule } from './modules/home/registration/candidateRegistration/candidateRegistration.module';
import { EmployerRegistrationModule } from './modules/home/registration/employer-registration/employer-registration.module';
import { WalletModule } from './modules/sidenav/wallet/wallet.module';
import { ProfileModule } from './modules/sidenav/profile/profile.module';
import { ReferModule } from './modules/sidenav/refer/refer.module';
import { VideoChatModule } from './modules/sidenav/video-chat/video-chat.module';
import { LanguageAssessmentModule } from './modules/sidenav/assessment/assessment-dialog/language-assessment/language-assessment.module';
import { DevelopmentTestingModule } from './modules/sidenav/development-testing/development-testing.module';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {ActivationModule} from './static/activation/activation.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {
        timeOut: 0,
        positionClass: 'toast-bottom-right',
      },
    ),
    NgxdModule,
    AlinaModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SidenavModule,
    LoginModule,
    RegisterModule,
    ReferModule,
    AlinaModule,
    AssessmentModule,
    DashboardModule,
    HomeModule,
    DomainTestModule,
    JobsModule,
    ProfileModule,
    CandidateRegistrationModule,
    EmployerRegistrationModule,
    VideoChatModule,
    WalletModule,
    LanguageAssessmentModule,
    DevelopmentTestingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ActivationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    RegisterComponent  // enables to use as an overlay
  ],
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('iboxz-angular-theme');
  }
}
