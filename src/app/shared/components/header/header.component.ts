import {
  Component,
  computed,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
import { cities } from '../../../../../db';
import { UserAuthComponent } from '../../../auth/user-auth/user-auth.component';
import { CommonService } from '../../../services/common.service';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { URLConstant } from '../../../apiUrls/url';
=======
import { UserAuthComponent } from '../../../auth/user-auth/user-auth.component';
import { CommonService } from '../../../services/common.service';

import { DomSanitizer } from '@angular/platform-browser';
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
export class NgbdModalContent {
  activeModal = inject(NgbActiveModal);
}
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
<<<<<<< HEAD
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;
  cityData: any[] = cities;
=======
  @ViewChild('cityModal', { static: true }) content!: TemplateRef<any>;
  cityData: any[] = [];
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
  citiesJson: any = null;
  showCities = false;
  selectedCity: any;
  city = false;
  viewCitiesText: string = 'View All Cities';
  showProfileheader: any;
<<<<<<< HEAD
  constructor(private modalService: NgbModal, public commonService: CommonService, private router: Router, private apiService: ApiService) {

    // this.selectedCity = this.commonService._selectCity()
=======
  constructor(private modalService: NgbModal, public commonService: CommonService,
    private sanitizer: DomSanitizer
  ) {

    this.selectedCity = this.commonService._selectCity()
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
  }

  ngOnInit(): void {
    this.getAllPopularCity()
    // Open modal Without City Selected 
    this.showProfileheader = this.commonService._profileHeader()
    if (!this.selectedCity) {
      this.openCityModal(this.content)
    }

  }

  openCityModal(content: TemplateRef<any>) {
    this.modalService.open(content, {
      modalDialogClass: 'dialog',
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  viewAllCities() {
    this.showCities = !this.showCities;
<<<<<<< HEAD
    this.apiService.get(URLConstant.CITY.ALL_CITY).subscribe((res) => {
      this.viewCitiesText = this.showCities ? 'Hide All Cities' : 'View All Cities';
      this.citiesJson = this.showCities ? res : null;
    })
  }

  getAllPopularCity() {
    this.apiService.get(URLConstant.CITY.POPULAR_CITY).subscribe((res) => {
=======
    if (this.showCities) {
      this.commonService.getAllCities().subscribe((res) => {

        this.citiesJson = this.showCities ? res : null;
      })
    }
    this.viewCitiesText = this.showCities ? 'Hide All Cities' : 'View All Cities';

  }

  getAllPopularCity() {
    this.commonService.getPopularCities().subscribe((res) => {
      console.log(res)
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
      this.cityData = res;
    })
  }



  openLoginModal(): void {
    const modalOptions: NgbModalOptions = {
      centered: true,
    };
    const modalRef = this.modalService.open(UserAuthComponent, modalOptions);
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }


  selectCity(city: any, modalRef: NgbModalRef) {
    this.commonService._selectCity.set(city)
    this.selectedCity = this.commonService._selectCity()
    sessionStorage.setItem('selectedCity', JSON.stringify(this.selectedCity))
    if (modalRef) {
      this.closeModal(modalRef)
      // modalRef.close()
      if (this.commonService._selectedCategory()) {
        let newRoute = this.router.url.split('-')[0] + '-' + this.commonService._selectCity().toLowerCase()
        this.router.navigate([newRoute])

      }
      else {
        this.router.navigate([`/explore/home/${this.commonService._selectCity().toLowerCase()}`])
      }


    }
  }

<<<<<<< HEAD

  closeModal(modalRef:NgbModalRef){
    if(modalRef){
      modalRef.close()
    }
  }

  isSelected(categroy: string): boolean {
    let res = categroy === this.commonService._selectedCategory()

    return res

  }

  editProfile() {

  }
  async fetchLocation() {
    try {
      const location = await this.commonService.getCurrentLocation();
      console.log("Your location:", location);
      this.commonService.setSelectedCity(location)
      this.modalService.dismissAll()
    } catch (error: any) {
      console.error(error.message);
=======
  editProfile() {

  }
  // Formating image
  getImageFromBase64(base64string: string): any {
    if (base64string) {
      let imageType = base64string;
      const fullBase64String = `data:${imageType};base64,${base64string}`;
      return this.sanitizer.bypassSecurityTrustUrl(fullBase64String);
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
    }
  }


}

