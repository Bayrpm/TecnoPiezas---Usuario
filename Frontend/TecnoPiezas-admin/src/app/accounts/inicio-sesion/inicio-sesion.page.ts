import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  correo: string = '';
  password: string = '';

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }

  iniciarSesion() {
    const userData = {
      correo: this.correo,
      password: this.password,
    };

    this.adminService.iniciarSesionPrivado(userData).subscribe(
      (response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);

          this.router.navigate(['/locales-home']);
        }
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }

}
