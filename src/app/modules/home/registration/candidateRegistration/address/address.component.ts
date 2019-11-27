import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      addressLine1:                   ['', Validators.required],
      addressLine2:                   ['', Validators.required],
      city:                           ['', Validators.required],
      state:                          ['', Validators.required],
      zipCode:                        ['', Validators.required],
      country:                        ['', Validators.required],
      address_type:                   ['', Validators.required]
      });
  }

}
