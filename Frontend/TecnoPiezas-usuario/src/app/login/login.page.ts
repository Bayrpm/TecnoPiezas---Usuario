import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  isLoginForm: boolean = true;
  isSignupForm: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleForm(formType: string) {
    if (formType === 'login') {
      this.isLoginForm = true;
      this.isSignupForm = false;
    } else if (formType === 'signup') {
      this.isLoginForm = false;
      this.isSignupForm = true;
    }
  }

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          this.router.navigate(['/tabs/principal']);
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
        }
      );
    }
  }

  register() {
    if (this.name && this.email && this.password) {
      this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe(
        (response) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrarse', error);
        }
      );
    }
  }
}
