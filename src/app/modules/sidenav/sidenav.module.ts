import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule} from '@angular/material';
import { RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [SidenavComponent],
  exports: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatListModule,
    FlexLayoutModule
  ],
  bootstrap: [SidenavComponent]
})
export class SidenavModule { }
