import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoginForm: boolean = true;
  isSignupForm: boolean = false;

  toggleForm(formType: string) {
    if (formType === 'login') {
      this.isLoginForm = true;
      this.isSignupForm = false;
    } else if (formType === 'signup') {
      this.isLoginForm = false;
      this.isSignupForm = true;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
