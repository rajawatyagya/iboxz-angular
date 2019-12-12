import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpPopupComponent } from './exp-popup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule, MatRadioModule,
    MatSlideToggleModule
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [ExpPopupComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatCardModule,
        MatButtonModule,
        FlexModule,
        MatDialogModule,
        MatRadioModule
    ]
})
export class ExpPopupModule { }
