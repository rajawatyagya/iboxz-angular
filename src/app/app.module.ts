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
import { AlinaModule } from './modules/alina/alina.module';
import { LoginComponent } from './modules/login/login.component';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { RegisterComponent } from './modules/register/register.component';
import { AssessmentModule } from './modules/assessment/assessment.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HomeModule } from './modules/home/home.module';
import { DomainTestModule } from './modules/domain-test/domain-test.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { CandidateRegistrationModule } from './modules/registration/candidateRegistration/candidateRegistration.module';
import { EmployerRegistrationModule } from './modules/registration/employer-registration/employer-registration.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ReferModule } from './modules/refer/refer.module';
import { VideoChatModule } from './modules/video-chat/video-chat.module';
import { PronunciationModule } from './modules/pronunciation/pronunciation.module';
import { LanguageAssessmentModule } from './modules/language-assessment/language-assessment.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {
        timeOut: 7000,
        positionClass: 'toast-bottom-right'
      }
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
    PronunciationModule,
    LanguageAssessmentModule
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
