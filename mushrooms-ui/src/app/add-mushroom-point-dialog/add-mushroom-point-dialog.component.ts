import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LatLng} from "../models/latLng";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-mushroom-point-dialog',
  templateUrl: './add-mushroom-point-dialog.component.html',
  styleUrls: ['./add-mushroom-point-dialog.component.css']
})
export class AddMushroomPointDialogComponent implements OnInit {

  coordinates: LatLng;

  form: FormGroup = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.maxLength(255), Validators.minLength(2)]),
    details: this.fb.control('', [Validators.maxLength(255)])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) data: LatLng,
    private fb: FormBuilder
  ) {
    this.coordinates = data;
  }

  ngOnInit(): void {
  }

  hasError(field: string) {
    const errors = this.form.controls['name'].errors;
    return !errors ? false : errors[field];
  }

}
