import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../productos.service';
import { Router } from '@angular/router'; // Importa el servicio Router para la navegación

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  correo: string = '';
  password: string = '';

  constructor(private productosService: ProductosService, private router: Router) {}

  ngOnInit() {}

  iniciarSesion() {
    const userData = {
      correo: this.correo,
      password: this.password,
    };

    this.productosService.iniciarSesion(userData).subscribe(
      (response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
<<<<<<< HEAD
  
          // Redirigir a la página principal y pasar el nombre del usuario como parámetro
          this.router.navigate(['/tabs/principal'], { state: { nombreUsuario: response.nombreUsuario } });
=======
>>>>>>> parent of db01b4d (Merge pull request #29 from Bayrpm/Cristóbal-Aravena)

          this.router.navigate(['/registro']);
        }
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
}
