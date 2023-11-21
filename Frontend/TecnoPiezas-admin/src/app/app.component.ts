import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
  ];

  usuarioLogeado = false;

  constructor(private adminService: AdminService,
              private router: Router) {}

  ngOnInit(): void {
    this.adminService.estaLogeado$.subscribe((logeado) => {
      this.usuarioLogeado = logeado;
    });
  }

  logout() {
    this.adminService.CerrarSesion().subscribe(
      () => {
        
        this.router.navigate(['/inicio-sesion-privado/']);

        console.log('Logout exitoso');
      },
      (error: any) => {
        // Manejo de errores durante el logout
        if (error.status === 401) {
          console.error('Token no válido o expirado');
          // Realizar alguna acción para notificar al usuario sobre el problema del token (por ejemplo, redirigir a la página de inicio de sesión)
        } else {
          console.error('Error en el logout:', error);
          // Otros errores durante el logout (puedes mostrar un mensaje genérico al usuario)
        }
      }
    );
  }
}
