import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-content-form',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-content.component.html'
})
export class CreateContentComponent implements OnInit {

  contentForm!: FormGroup; contentTypes = ['movie', 'event', 'sport', 'activity'];
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.contentForm = this.fb.group({
      contentId: [''],
      type: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      duration: [null],
      posterUrl: [''],
      status: [''],
       contentDetails: this.fb.group({})
    });


  this.setContentDetails('activity')











    
    // react when type changes 
    this.contentForm.get('type')?.valueChanges.subscribe(type => { this.setContentDetails(type); });
  }
  setContentDetails(type: string) {
    const contentDetails = this.contentForm.get('contentDetails') as FormGroup;
    // clear previous controls
    Object.keys(contentDetails.controls).forEach(key => {
      contentDetails.removeControl(key);
    });
    switch (type) {
      case 'movie':
        contentDetails.addControl('movie', this.fb.group({
          language: this.fb.array([]),
          format: this.fb.array([]),
          genres: this.fb.array([]),
          cast: this.fb.array([]),
          director: ['', Validators.required],
          releaseDate: ['', Validators.required],
          trailerUrl: ['']
        }));
        break;
      case 'event':
        contentDetails.addControl('event', this.fb.group({
          category: ['', Validators.required],
          performers: this.fb.array([])
        }));
        break;
      case 'sport':
        contentDetails.addControl('sport', this.fb.group({
          sportType: ['', Validators.required],
          teams: this.fb.array([]), league: ['']
        }));
        break;
      case 'activity':
        contentDetails.addControl('activity', this.fb.group({
          category: ['', Validators.required], instructor: ['', Validators.required]
        }));
        break;
    }
  }
  // utility to add FormArray items
  addFormArrayItem(path: string, value: string = 'sf') {
    const control = this.contentForm.get(path) as FormArray;
    control.push(this.fb.control(value, Validators.required));
  }

  get sportTeams(): FormArray {
  return this.contentForm.get('contentDetails.sport.teams') as FormArray;
}

get movieLanguages(): FormArray {
  return this.contentForm.get('contentDetails.movie.language') as FormArray;
}

get movieGenres(): FormArray {
  return this.contentForm.get('contentDetails.movie.genres') as FormArray;
}

get eventPerformers(): FormArray {
  return this.contentForm.get('contentDetails.event.performers') as FormArray;
}


  removeFormArrayItem(path: string, index: number) {
    const control = this.contentForm.get(path) as FormArray;
    control.removeAt(index);
  }
  onSubmit() {
    // if (this.contentForm.valid) {
      console.log('Form Data:', this.contentForm.value);
    // }
    // else {
    //   this.contentForm.markAllAsTouched();
    // }

  }


  handleImageUpload(){
    console.log('handleImageUpload called')
  }
}