import { Component, OnDestroy } from '@angular/core';
import { movies } from '../../../../../../db';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-movie',
  standalone: false,
  templateUrl: './movies-landingpage.component.html',
  styleUrl: './movies-landingpage.component.scss'
})
<<<<<<< HEAD:src/app/modules/explore/movies/landingpage/landingpage.component.ts
export class MovieComponent implements OnDestroy {
=======
export class MovieLandingPageComponent {
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf:src/app/modules/explore/movies/movies-landingpage/movies-landingpage.component.ts
  dummyMoviesdata: any[] = [];

  originalMovies = movies

  constructor(public commonService: CommonService) {
    this.dummyMoviesdata = movies;
  }

  ngOnDestroy(){
this.commonService.setSelectedCategory(null)
  }

}
