import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileModule } from './modules/user-proile/user-profile.module';
import { MoviesDetailsComponent } from './shared/components/movies-details/movies-details.component';
import { ListYourShowModule } from './modules/list-your-show/list-your-show.module';
<<<<<<< HEAD
import { IExploreListComponent } from './shared/components/i-explore-list/i-explore-list.component';
import { BuyTicketsComponent } from './shared/components/buy-tickets/buy-tickets.component';
=======
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf

const routes: Routes = [
  {
    path: '',
    redirectTo: 'explore',
    pathMatch: 'full',
  },
  {
    path: 'explore',
    loadChildren: () => import('./modules/explore/explore.module').then((m) => m.ExploreModule)
  },
  {
    path: 'my-profile',
    loadChildren: () =>
      import('./modules/user-proile/user-profile.module').then((m) => UserProfileModule),
  },
  {
    path: 'list-your-show',
    loadChildren: () =>
      import('./modules/list-your-show/list-your-show.module').then((m) => ListYourShowModule),
  },
  {
    path: 'movies/:city/:id', component: MoviesDetailsComponent


  },
  {
    path: 'movies/:city/:name/buytickets/:id', component: BuyTicketsComponent
    

  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
