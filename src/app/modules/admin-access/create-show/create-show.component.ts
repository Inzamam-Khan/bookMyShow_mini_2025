import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { contents,venues } from '../../../../../db';
@Component({
  selector: 'app-show-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-show.component.html',
  styleUrls: ['./create-show.component.scss']
})
export class CreateShowComponent implements OnInit {


  contents = contents


  venues =venues












  showForm!: FormGroup;

  venuesNameList: any[] = []
  eventsNameList: any[] = []

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.showForm = this.fb.group({
      eventName: ['', Validators.required],
      venueName: ['', Validators.required],
      eventType: ['', Validators.required],  // movies | sports | events | activities
      city: ['', Validators.required],
      date: ['', Validators.required],       // YYYY-MM-DD
      startTime: ['', Validators.required],  // HH:mm
      duration: [null, [Validators.required, Validators.min(1)]],

      language: ['', Validators.required],
      format: ['', Validators.required],

      locationReference: this.fb.group({
        screenName: ['', Validators.required]
      }),

      categories: this.fb.array([]),

      status: ['', Validators.required]      // active | cancelled | completed | ongoing
    });


    console.log(this.contents, this.venues)
  }

  // Getter for categories array
  get categories(): FormArray {
    return this.showForm.get('categories') as FormArray;
  }

  // Add category group
  addCategory(): void {
    const categoryGroup = this.fb.group({
      category: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      totalSeats: [null, [Validators.required, Validators.min(1)]],
      reservedSeats: this.fb.array([])
    });

    this.categories.push(categoryGroup);
  }

  // Getter for reservedSeats inside a category
  getReservedSeats(index: number): FormArray {
    return this.categories.at(index).get('reservedSeats') as FormArray;
  }

  // Add reserved seat into a specific category
  addReservedSeat(categoryIndex: number): void {
    const reservedSeatGroup = this.fb.group({
      seatId: ['', Validators.required],
      status: ['', Validators.required], // reserved | booked | blocked
      userId: ['', Validators.required],
      timestamp: ['', Validators.required],
      holdExpiry: [''] // optional
    });

    this.getReservedSeats(categoryIndex).push(reservedSeatGroup);
  }

  onSubmit(): void {
    if (this.showForm.valid) {
      console.log('Form Value:', this.showForm.value);
    } else {
      console.log('Form Invalid');
      this.showForm.markAllAsTouched();
    }
  }

  onCityChange() {
    let selectedCity = this.showForm.get('city')?.value
    let selectedEventType = this.showForm.get('eventType')?.value

    this.venuesNameList = this.venues.filter((venue: any) => {
      if (venue.address.city.toLowerCase() == selectedCity.toLowerCase() && venue.venueFor.toLowerCase() == selectedEventType.toLowerCase()) return venue

    })

    console.log(this.venuesNameList)
  }



  onVenueNameChange() {
    let selectedEventType = this.showForm.get('eventType')?.value
    this.eventsNameList = this.contents.filter((content: any) => {
      if (content.type.toLowerCase() == selectedEventType.toLowerCase()) return content
    })

    console.log(this.eventsNameList)
  }
}