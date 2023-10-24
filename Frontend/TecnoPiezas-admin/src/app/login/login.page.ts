import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData = {
    username: '',
    password: '',
  };

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.adminService.login(this.loginData).subscribe(
      (response: { token: string; role: string; }) => {
        // Guarda el token en el almacenamiento local
        localStorage.setItem('token', response.token);
  
        // Redirige al usuario a la página de inicio o a la página correspondiente según su rol
        if (response.role === 'administrador') {
          this.router.navigate(['/locales-home']);
        } else if (response.role === 'gerente') {
          this.router.navigate(['/locales-home']);
        }
      },
      (error: any) => {
        if (error.status === 400) {
          if (error.error && error.error.detail) {
            // El servidor respondió con un mensaje de error personalizado
            console.error('Error de inicio de sesión:', error.error.detail);
          } else {
            // Error genérico de inicio de sesión
            console.error('Error de inicio de sesión: Credenciales incorrectas o usuario inexistente.');
          }
        } else {
          // Otro tipo de error, como problemas de red
          console.error('Error de inicio de sesión: No se pudo conectar al servidor.');
        }
      }
    );
  }

}
