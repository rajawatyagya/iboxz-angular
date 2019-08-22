import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatCardModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule
  ]
})
export class ProfileModule { }
