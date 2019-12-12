import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {flyInOut} from '../../../../../animations/app.animation';
import {ApiService} from '../../../../../services/api.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut()
  ]
})
export class AddressComponent implements OnInit {

  @Input() userId: string;
  @Output() public getStep = new EventEmitter<number>();
  addressForm: FormGroup;
  checked = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertService: ToastrService
  ) { }

  ngOnInit() {
    this.addressForm =  this.fb.group({
      user:             '',
      presentAddress:   this.fb.group({
        addressLine1:                   ['', Validators.required],
        addressLine2:                   ['', Validators.required],
        city:                           ['', Validators.required],
        state:                          ['', Validators.required],
        zipCode:                        ['', Validators.required],
        country:                        ['', Validators.required],
        address_type:                   ['present', Validators.required]
      }),
      permanentAddress: this.fb.group({
        addressLine1:                   ['', Validators.required],
        addressLine2:                   ['', Validators.required],
        city:                           ['', Validators.required],
        state:                          ['', Validators.required],
        zipCode:                        ['', Validators.required],
        country:                        ['', Validators.required],
        address_type:                   ['permanent', Validators.required]
      })
    });
  }

  isSelected(event) {
    this.checked = event.target.checked;
  }

  onAddressSubmit() {
    this.addressForm.patchValue({
      user: this.userId
    });
    if (this.checked) {
      this.addressForm.removeControl('permanentAddress');
    }
    this.apiService.saveAddress(this.addressForm.value).subscribe(
      (result) => {
        this.alertService.success('Address details have been saved successfully', 'Alina:');
        this.getStep.emit(2);
      }
    );
  }

}
