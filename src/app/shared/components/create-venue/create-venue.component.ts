import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-venue-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-venue.component.html'
})
export class CreateVenueComponent implements OnInit {
  venueForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.venueForm = this.fb.group({
      venueName: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        pin: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
      }),
      venueCapacity: ['', [Validators.required, Validators.min(1)]],
      venueFor: ['', Validators.required],
      venueType: ['', Validators.required],
      supportedCategories: this.fb.array([this.fb.control('', Validators.required)]),
      additionalFields: this.fb.group({}),
      amenities: this.fb.array([this.fb.control('', Validators.required)])
    });

    this.onVenueForChange()
  }


  onVenueForChange() {
    let additionalFields = 
    this.venueForm.get('additionalFields') as FormGroup

    additionalFields.addControl('screens',
      this.fb.array([this.createScreen()]))
    

    console.log(this.venueForm.value)
    

  }


  get screens() {
    return this.venueForm.get('additionalFields.screens') as FormArray
  }

  createScreen(){
    return this.fb.group({
      screenName:[''],
      layouts:this.fb.array([this.createLayout()])

    })
  }

   addScreen(){
    this.screens.push(this.createScreen())
  }

  removeScreen($index:number){
    this.screens.removeAt($index)

  }


getLayouts(screen:AbstractControl):FormArray{
  return screen.get('layouts') as FormArray
}

createLayout(){
  return this.fb.group({
    layoutName:[''],
    rows:[''],
    cols:14
  })
}

addLayout(screen:AbstractControl){
  this.getLayouts(screen).push(this.createLayout())
}
removeLayout(screen:AbstractControl,$index:number){
  this.getLayouts(screen).removeAt($index)
}


 

  // Getter for supportedCategories
  get supportedCategories(): FormArray {
    return this.venueForm.get('supportedCategories') as FormArray;
  }

  // Getter for amenities
  get amenities(): FormArray {
    return this.venueForm.get('amenities') as FormArray;
  }

  // Add/Remove supportedCategories
  addCategory(): void {
    this.supportedCategories.push(this.fb.control('', Validators.required));
  }

  removeCategory(index: number): void {
    this.supportedCategories.removeAt(index);
  }

  // Add/Remove amenities
  addAmenity(): void {
    this.amenities.push(this.fb.control('', Validators.required));
  }

  removeAmenity(index: number): void {
    this.amenities.removeAt(index);
  }

  // Submit
  onSubmit(): void {
    // if (this.venueForm.valid) {
    console.log('Form Submitted:', this.venueForm.value);
    // } else {
    //   this.venueForm.markAllAsTouched();
    // }
  }



}

