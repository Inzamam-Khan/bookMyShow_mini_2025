import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) { }
  city = sessionStorage.getItem("selectedCity");
<<<<<<< HEAD
  _selectCity = signal<any>(this.city ? JSON.parse(this.city) : '');


  // -----------inz-start-------------------
  selectedCategory = (sessionStorage.getItem('selectedCategory'))
  _selectedCategory = signal<string | null>(this.selectedCategory ? JSON.parse(this.selectedCategory) : null)

  selectedLangFormat=sessionStorage.getItem('selectedLangFormat')
  _selectedLangFormat=signal<any>(this.selectedLangFormat? JSON.parse(this.selectedLangFormat) : null)

  // --------------inz-end-------------------
  _profileHeader = signal<any>(false);
  roles: any[] = ['User', 'Admin']
  constructor(private http: HttpClient) {
  }



  

 

// -----------inz-start-------------------

 getCityNameByLocation(lat: number, lon: number) {

    return this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
  }


setLanguageFormat(langFormat:any){
  console.log('func caled')
  this._selectedLangFormat.set(langFormat)
  sessionStorage.setItem('selectedLangFormat',JSON.stringify(langFormat))
=======
  _selectCity = signal<any>(this.city ? JSON.parse(this.city) : null);
  _profileHeader = signal<any>(false);

  baseUrl = environment.baseUrl

  getAllCities(): Observable<any> {
    return this.http.get(`http://172.31.252.101:8080/bookmyshow/city/all`)
  }
  getPopularCities(): Observable<any> {
    return this.http.get(`http://172.31.252.101:8080/bookmyshow/city/popular`)
  }


>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
}


setSelectedCity(city: any) {
  this._selectCity.set(city.toLowerCase())
  sessionStorage.setItem('selectedCity', JSON.stringify(this._selectCity()))
}
  setSelectedCategory(category: string | null) {
    this._selectedCategory.set(category)
    sessionStorage.setItem('selectedCategory', JSON.stringify(category))


  }
  getCurrentLocation(options = {}) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          this.getCityNameByLocation(coords.latitude, coords.longitude).subscribe(res =>
            resolve(res.address.city)
          )
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },

      );
    });
  }


// ------------inz-end-------------------
}


