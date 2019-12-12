import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './experience.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSlideToggleModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';
import {ExpPopupComponent} from './exp-popup/exp-popup.component';
import {ExpPopupModule} from './exp-popup/exp-popup.module';



@NgModule({
    declarations: [ExperienceComponent],
    exports: [
        ExperienceComponent
    ],
  imports: [
    CommonModule,
    ExpPopupModule,
    MatCardModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    FlexModule
  ],
  entryComponents: [ExpPopupComponent]
})
export class ExperienceModule { }
