import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  nombreUsuario: string = ''; // Inicializamos la variable

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Obtener el nombre de usuario desde el servicio
    this.nombreUsuario = this.authService.getNombreUsuario();
    console.log('Nombre de usuario:', this.nombreUsuario);
  
    // Obtener el nombre de usuario desde el estado de la ruta
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.extras && currentNavigation.extras.state) {
      const routeState = currentNavigation.extras.state;
      if ('nombreUsuario' in routeState) {
        this.nombreUsuario = routeState['nombreUsuario'];
      }
    }
  }
  

  irAInicioSesion() {
    this.router.navigate(['/inicio-sesion']);
  }
}
