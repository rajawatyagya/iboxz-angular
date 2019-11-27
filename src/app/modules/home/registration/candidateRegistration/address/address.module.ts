import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './address.component';
import {MatButtonModule, MatExpansionModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddressModule { }
