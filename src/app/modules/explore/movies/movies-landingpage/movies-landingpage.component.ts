import { Component, OnDestroy } from '@angular/core';
import { movies, selectedFilters } from '../../../../../../db';
import { CommonService } from '../../../../services/common.service';
import { Router } from '@angular/router';
import { MovieService } from '../service/movie-service.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie',
  standalone: false,
  templateUrl: './movies-landingpage.component.html',
  styleUrl: './movies-landingpage.component.scss'
})
export class MovieLandingPageComponent implements OnDestroy {
  dummyMoviesdata: any[] = [];
  selectedCity: any = null
  topFiltersArray!: any[]
  filtersArray: any[] = [] 
  originalMovies = movies;
  filters: any[] = this.filtersArray
  select: any[] = selectedFilters

  constructor(public commonService: CommonService, public router: Router, private movieService: MovieService, private toastr: ToastrService) {

    this.selectedCity = this.commonService._selectCity()
    this.commonService._selectedCategory.set('Movies');
  }

  /**
   * @description initialize Top Filters
   * @author Manu Shukla
   * @params  
   * @returnType void
   */


  test(){
// console.log(this.commonService.selectedFiltersSignal())  
console.log(this.commonService.topFiltersArray())  
  }
  ngOnInit(): void {

// console.log(this.commonService.topFiltersArray())




    this.setFilter()
    this.movieService.getFilters('languages').subscribe({
      next: (res) => {
        this.topFiltersArray = res.data
      },
      error: (res) => {
        this.toastr.error(res.message);
      }
    })
    this.movieService.getAllMovies().subscribe({
      next: (res) => {
        this.dummyMoviesdata = res.data
      },
      error: () => {
        this.toastr.error("Failed To Fetch Movies");
      }
    })
  }

  setFilter() {
    forkJoin([
      this.movieService.getFilters('languages'),
      this.movieService.getFilters('genres'),
      this.movieService.getFilters('formats')
    ]).subscribe({
      next: ([languages, genres, formats]) => {
        this.filters = [{ type: 'Language', data: languages.data }, { type: 'Genres', data: genres.data }, { type: 'Formats', data: formats.data }];
      },
      error: (res) => {
        this.toastr.error(res.message);
      }
    });
  }

  /**
* @description Remove Already Selected Filters
* @author Manu Shukla
* @params  
* @returnType void
*/

  ngOnDestroy(): void {
    this.commonService.resetfilterAccordian(this.filters)
  }
}
