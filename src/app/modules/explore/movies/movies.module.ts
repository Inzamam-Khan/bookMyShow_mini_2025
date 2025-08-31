import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MovieLandingPageComponent } from './movies-landingpage/movies-landingpage.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { UpcommingMoviesComponent } from './upcomming-movies/upcomming-movies.component';
import { FilterAccordionComponent } from '../../../shared/components/filter-accordion/filter-accordion.component';


@NgModule({
  declarations: [
<<<<<<< HEAD
    // MovieComponent,
=======
    MovieLandingPageComponent,
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
    UpcommingMoviesComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    CarouselModule,
<<<<<<< HEAD
    // TruncatePipe,
    FilterAccordianComponent
=======
    TruncatePipe,
    FilterAccordionComponent
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
  ]
})
export class MoviesModule { }
