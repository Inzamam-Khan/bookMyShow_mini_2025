import { computed, Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { filters, selectedFilters } from '../../../db';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  filters: any[] = filters
  select: any[] = selectedFilters
  baseUrl = environment.baseUrl
  // ----------------------------------------------

  // topFiltersArray = signal<any>(
  //   this.formatFilters([
  //     {
  //       type:'Language',
  //       data:[ {
  //       languageId: 1,
  //       languageName: "Hindi"
  //     },
  //     {
  //       languageId: 4,
  //       languageName: "Telugu"
  //     },
  //     {
  //       languageId: 2,
  //       languageName: "English"
  //     },
  //     {
  //       languageId: 5,
  //       languageName: "Gujarati"
  //     },
  //     {
  //       languageId: 3,
  //       languageName: "Japanese"
  //     },
  //     {
  //       languageId: 7,
  //       languageName: "Tamil"
  //     },
  //     {
  //       languageId: 9,
  //       languageName: "Punjabi"
  //     },
  //     {
  //       languageId: 6,
  //       languageName: "Malayalam"
  //     }]
  //     }

  //   ])
  // )



  selectedFiltersSignal = signal<any>(
    [

      {
        type: "Language",
        data: []
      },
      {
        type: "Formats",
        data: []
      },
      {
        type: "Genres",
        data: []
      },

    ])

  filtersSignal = signal<any[]>(
    this.formatFilters(
      [
        {

          type: "Language",
          data: [
            {
              languageId: 1,
              languageName: "Hindi"
            },
            {
              languageId: 4,
              languageName: "Telugu"
            },
            {
              languageId: 2,
              languageName: "English"
            },
            {
              languageId: 5,
              languageName: "Gujarati"
            },
            {
              languageId: 3,
              languageName: "Japanese"
            },
            {
              languageId: 7,
              languageName: "Tamil"
            },
            {
              languageId: 9,
              languageName: "Punjabi"
            },
            {
              languageId: 6,
              languageName: "Malayalam"
            }
          ]
        },
        {
          type: "Formats",
          data: [
            {
              "formatId": 1,
              "formatName": "2D"
            },
            {
              "formatId": 2,
              "formatName": "3D"
            },
            {
              "formatId": 3,
              "formatName": "4DX"
            },
            {
              "formatId": 4,
              "formatName": "MX4D"
            },
            {
              "formatId": 5,
              "formatName": "2D SCREEN X"
            },
            {
              "formatId": 6,
              "formatName": "IMAX 2D"
            }
          ]
        },
        {

          type: "Genres",
          data: [
            {
              "genresId": 10,
              "genresName": "Crime"
            },
            {
              "genresId": 21,
              "genresName": "Biography"
            },
            {
              "genresId": 2,
              "genresName": "Comedy"
            },
            {
              "genresId": 6,
              "genresName": "Fantasy"
            },
            {
              "genresId": 3,
              "genresName": "Action"
            },
            {
              "genresId": 14,
              "genresName": "Mystery"
            },
            {
              "genresId": 12,
              "genresName": "Historical"
            },
            {
              "genresId": 1,
              "genresName": "Drama"
            },
            {
              "genresId": 4,
              "genresName": "Thriller"
            },
            {
              "genresId": 5,
              "genresName": "Family"
            },
            {
              "genresId": 23,
              "genresName": "Adventure"
            }
          ]
        }

      ])
  )


  topFiltersArray = computed(() =>
    this.filtersSignal()
      .map(group => ({
        type: group.type,
        data: group.data.filter((item: any) => !item.selected)  // only selected ones
      }))
      .filter(group => group.data.length > 0) // remove empty groups
  );




  // ----------------------------------------------
  city = sessionStorage.getItem("selectedCity");
  _selectCity = signal<any>(this.city ? JSON.parse(this.city) : null);
  _profileHeader = signal<any>(false);
  searchSubject = new Subject<string>();
  selectedCategory: any = (localStorage.getItem('category'))
  _selectedCategory = signal<any>(JSON.parse(this.selectedCategory));

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * @description Get list of all cities from backend
   * @author Gurmeet Kumar
   * @return Observable<any>
   */
  getAllCities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/city/all`);
  }

  getContentDetailsById(contentId: string | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/events/${contentId}`)
  }
  /**
   * @description Get list of popular cities from backend
   * @author Gurmeet Kumar
   * @return Observable<any>
   */
  getPopularCities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/city/popular`);
  }
  setCategory(category: string | null) {
    this._selectedCategory.set(category)
    localStorage.setItem('category', JSON.stringify(category))
  }
  /**
* @description Resrt Filter Accordian 
* @author Manu Shukla
* @params  [Filters]
* @returnType void
*/
  resetfilterAccordian(filters: any) {
    filters.filter((item: any) => {
      item.data.filter((i: any) => {
        i.selected = false
        return item
      })
    })
  }

  /**
* @description iniitalizes the topFilterArray
* @author Manu Shukla
* @params  [Filters] receives array of filters
* @returnType [Filter] return the filteredArray on the basis of category
*/
  getTopFiltersArray(target: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/events/${target}`)
  }

  /**
 * @description Takes Filters Array , toggle the selected key and push into selectFilters array
 * @author Manu Shukla
 * @params  [Filters]
 * @returnType void
 */
  handleEventFilter(filter: any): void {
    console.log(filter)
    this.filtersSignal().map((item: any) => {
      if (item.type == filter.type) {
        item.data.map((i: any) => {
          if (i.text == filter.filterName.text) {
            i.selected = !i.selected
          }
        })
      }
    }
    )
    let filterType: any[] = this.selectedFiltersSignal().filter((item: any) =>
      item.type == filter.type
    )

    console.log(filterType)

    if (filterType) {
      let alreayExist = filterType[0].data.filter((i: any) => i.text == filter.filterName.text)
      if (alreayExist.length == 0) {
        filterType[0].data.push(filter.filterName)
        return filterType[0].data.sort((a: any, b: any) => a.index - b.index)
      }
      else {
        filterType[0].data = filterType[0].data.filter((i: any) => i.text != filter.filterName.text)
      }
    }
  }
  /**
  * @description Convert base64 string to safe image URL for display
  * @author Gurmeet Kumar
  * @return any
  */
  getImageFromBase64(base64string: string): any {
    if (base64string) {
      const fullBase64String = `data:${base64string};base64,${base64string}`;
      return this.sanitizer.bypassSecurityTrustUrl(fullBase64String);
    }
  }

  getEventDetailsById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/events/${id}`)

  }


  listYourShowService = [
    {
      image: 'assets/images/list-your-show/online-saless.png',
      tittle: 'Online Sales & Marketing',
      description: 'Ensure convenience through both online and offline tickets for your attendees.',
      itemsList: ['Target millions of potential customers', 'Hassle free sales', 'Create custom discounts', 'Engage on social media', 'Sell more tickets on ground']
    },
    {
      image: 'assets/images/list-your-show/pricings.png',
      tittle: 'Pricing',
      description: 'Pricing, inventory, and payment reconciliation.',
      itemsList: ['Pricing recommendations', 'Hassle free sales', 'Create custom discounts', 'Engage on social media', 'Sell more tickets on ground']
    },
    {
      image: 'assets/images/list-your-show/food.png',
      tittle: 'Food & beverages, stalls and the works!',
      description: 'Maximise your space with an array of food and beverage and merchandising vendors.',
      itemsList: ['Cashless payments', 'Age verification counters', 'Offer sponsor discounts', 'Engage on social media', 'Ticket specific offerings']
    },
    {
      image: 'assets/images/list-your-show/on-ground-support.png',
      tittle: 'On ground support & gate entry management',
      description: 'Get everything you need to setup from a music gig to a theatrical performance.',
      itemsList: ['Stage setup', 'logistics and handling', 'Box office support', 'Engage on social media', 'And so on...']
    },
    {
      image: 'assets/images/list-your-show/report.png',
      tittle: 'Reports & business insights',
      description: 'Get detailed insights into and cohesive reports about your event.',
      itemsList: ['In depth reports', 'Access registration data', 'behavioural insights']
    },
    {
      image: 'assets/images/list-your-show/rfids.png',
      tittle: 'POS, RFID, Turnstiles & more...',
      description: 'Still searching for reasons? We also offer these.',
      itemsList: ['Digital tickets', 'Print at Home ticket solution', 'Mobile ticket scanning']
    },

  ]

  formatFilters(filters: any): any {
    let filtersArray: any = [];


    filters.map((filter: any) => {
      let { data, type } = filter;
      let filteredData;

      switch (type) {
        case 'Language':
          filteredData = data.map((i: any) => ({ ...i, text: i.languageName, selected: false }));
          break;

        case 'Genres':
          filteredData = data.map((i: any) => ({ ...i, text: i.genresName, selected: false }));
          break;

        case 'Formats':
          filteredData = data.map((i: any) => ({ ...i, text: i.formatName, selected: false }));
          break;

        case 'Date':
          filteredData = data.map((i: any) => ({ ...i, text: i.dateFilterName, selected: false }));
          break;

        case 'Categories':
          filteredData = data.map((i: any) => ({ ...i, text: i.categoryName, selected: false }));
          break;

        case 'More Filters':
          filteredData = data.map((i: any) => ({ ...i, text: i.moreFilterName, selected: false }));
          break;

        case 'Price':
          filteredData = data.map((i: any) => ({ ...i, text: i.priceRange, selected: false }));
          break;

        case 'Tags':
          filteredData = data.map((i: any) => ({ ...i, text: i.tageName, selected: false }));
          break;

        case 'Release Month':
          filteredData = data.map((i: any) => ({ ...i, text: i.releaseMonthName, selected: false }));
          break;

        default:
          filteredData = data;
      }
      filtersArray.push({ type, data: filteredData });
    });
    return filtersArray;
  }
}
