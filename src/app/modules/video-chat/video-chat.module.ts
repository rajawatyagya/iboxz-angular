import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgoraConfig,
        AngularAgoraRtcModule } from 'angular-agora-rtc';
import { VideoChatComponent } from './video-chat.component';
import { FlexModule } from '@angular/flex-layout';

const agoraConfig: AgoraConfig = {
  AppID: '6b79c532597040df8262f81ed911900a'
};

@NgModule({
  declarations: [ VideoChatComponent ],
  imports: [
    CommonModule,
    AngularAgoraRtcModule.forRoot(agoraConfig),
    FlexModule
  ]
})
export class VideoChatModule { }
