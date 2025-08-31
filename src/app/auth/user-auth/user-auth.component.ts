import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { URLConstant } from '../../apiUrls/url';
import { ApiService } from '../../services/api.service';
=======
import { ApiService } from '../../services/api.service';
import { AuthService } from '../auth-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
@Component({
  selector: 'app-user-auth',
  standalone: false,
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
<<<<<<< HEAD
  openSignuForm: boolean = false;
  showPassword: boolean = false;

  constructor(private service: ApiService) {
=======
  openSignupForm: boolean = false;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private activeModal: NgbActiveModal) {
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
  }

  ngOnInit(): void { }
  userLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  userSignUp = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]),
<<<<<<< HEAD
    roleName: new FormControl(null, Validators.required),
=======
    roleName: new FormControl("USER", Validators.required),
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  onloginSubmit() {
<<<<<<< HEAD

    if (this.userLogin.valid) {
      const data = this.userLogin.value;
      this.service.post(URLConstant.USER.LOGIN, data).subscribe((res) => {
        console.log(res)
        localStorage.setItem('token', res.token);

        this.userLogin.reset();
=======
    if (this.userLogin.valid) {
      const data = this.userLogin.value;
      this.authService.userLogin(data).subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.userLogin.reset();
        this.activeModal.close(UserAuthComponent)
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
      });
    }
  }


  onSignupSubmit() {
    if (this.userSignUp.valid) {
<<<<<<< HEAD
      console.log(this.userSignUp.value)
      const data = this.userSignUp.value;
      this.service.post(URLConstant.USER.REGISTER, data).subscribe((res) => {
        console.log("Signup Data:", res);

        this.userSignUp.reset();
=======
      const data = this.userSignUp.value;
      this.authService.userSignup(data).subscribe((res) => {
        this.userSignUp.reset();
        this.activeModal.close(UserAuthComponent)
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
      })
    }
  }

<<<<<<< HEAD


=======
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  openFormSignup() {
<<<<<<< HEAD
    this.openSignuForm = !this.openSignuForm;
=======
    this.openSignupForm = !this.openSignupForm;
>>>>>>> 074adfa4bf4bb972adb91a77c8224f5d32ba2ddf
  }
}
