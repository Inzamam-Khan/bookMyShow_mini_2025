import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { movies } from '../../../../../../db';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home-landingpage.component.html',
  styleUrl: './home-landingpage.component.scss',
})
<<<<<<< HEAD:src/app/modules/explore/home/landingpage/landingpage.component.ts
export class HomeComponent{
=======
export class HomeLandingPageComponent {
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf:src/app/modules/explore/home/home-landingpage/home-landingpage.component.ts
  dummyMoviesdata: any[] = [];
  moviesFilteredData: any[] = []
  originalMovies = movies
  pageNo = 0;
  itemsPerCards = 6;
  start = 0
  end = 0
  constructor(public commonService: CommonService) {
    this.dummyMoviesdata = movies;
    this.getVisibleMovieCard()
  }

<<<<<<< HEAD:src/app/modules/explore/home/landingpage/landingpage.component.ts

=======
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf:src/app/modules/explore/home/home-landingpage/home-landingpage.component.ts
  getVisibleMovieCard() {
    this.start = this.itemsPerCards * this.pageNo;
    this.end = this.start + this.itemsPerCards
    this.moviesFilteredData = this.originalMovies.slice(this.start, this.end);
  }

  next() {
    if (this.end < this.originalMovies.length) {
      this.pageNo++;
      this.getVisibleMovieCard();
    }
  }

  prev() {
    if (this.start > 0) {
      this.pageNo--;
      this.getVisibleMovieCard();
    }
  }


}
