import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieLandingPageComponent } from './movies-landingpage/movies-landingpage.component';
import { UpcommingMoviesComponent } from './upcomming-movies/upcomming-movies.component';

const routes: Routes = [
<<<<<<< HEAD
 
  // { path: ':city', component: MovieComponent },
=======

  { path: '', component: MovieLandingPageComponent },
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
  { path: 'upcoming-movies', component: UpcommingMoviesComponent },
 {
    path: '', redirectTo: '', pathMatch: 'full'},]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule { }
