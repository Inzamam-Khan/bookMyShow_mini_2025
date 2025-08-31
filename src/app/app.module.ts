import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAuthComponent } from './auth/user-auth/user-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterAccordionComponent } from './shared/components/filter-accordion/filter-accordion.component';
import { MoviesDetailsComponent } from './shared/components/movies-details/movies-details.component';
import { CarouselModule } from "ngx-bootstrap/carousel";
<<<<<<< HEAD
import { IExploreListComponent } from './shared/components/i-explore-list/i-explore-list.component';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
=======
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { SearchBoxComponent } from './shared/components/searchBox/searchBox.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserAuthComponent,
    ErrorPageComponent,
    SearchBoxComponent

  ],
<<<<<<< HEAD
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, ReactiveFormsModule, FormsModule, FilterAccordianComponent, MoviesDetailsComponent, CarouselModule, HttpClientModule],
=======
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule, FormsModule, MoviesDetailsComponent, CarouselModule, FilterAccordionComponent, HttpClientModule],
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule { }
