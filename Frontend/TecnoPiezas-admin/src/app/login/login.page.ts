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
    console.log("Login data:", this.loginData); // Verifica si los datos de inicio de sesión se envían correctamente

    this.adminService.login(this.loginData).subscribe(
      (response: { token: string; role: string; }) => {
        console.log("Login response:", response); // Registra la respuesta del servidor

        // Redirige al usuario a la página de inicio o a la página correspondiente según su rol
        if (response.role === 'administrador') {
          this.router.navigate(['/login']);
        } else if (response.role === 'gerente') {
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        console.log("Error response:", error); // Registra los errores en la consola

        if (error.status === 400) {
          if (error.error && error.error.detail) {
            console.error('Error de inicio de sesión:', error.error.detail);
          } else if (error.error && error.error.non_field_errors) {
            console.error('Error de inicio de sesión:', error.error.non_field_errors);
          } else {
            console.error('Error de inicio de sesión: Credenciales incorrectas o usuario inexistente.');
          }
        } else if (error.status === 0) {
          console.error('Error de inicio de sesión: No se pudo conectar al servidor. Verifica tu conexión a internet o intenta nuevamente más tarde.');
        } else {
          console.error('Error de inicio de sesión: Error inesperado. Comunícate con el soporte técnico.');
        }
      }
    );
  }

}
