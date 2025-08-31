import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLandingPageComponent } from './home-landingpage/home-landingpage.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'delhi',
    pathMatch: 'full',component: HomeComponent
  },
<<<<<<< HEAD
  // { path: 'delhi', component: HomeComponent },
  { path: ':city', component: HomeComponent },
=======
  { path: 'delhi', component: HomeLandingPageComponent },
  { path: 'home/:city', component: HomeLandingPageComponent },
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
