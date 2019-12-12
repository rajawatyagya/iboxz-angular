import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import {
    MatAutocompleteModule,
    MatButtonModule, MatCardModule,
    MatDatepickerModule, MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule, MatSelectModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
    declarations: [EducationComponent],
    exports: [
        EducationComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatCardModule,
        FlexModule,
        MatDividerModule
    ]
})
export class EducationModule { }
