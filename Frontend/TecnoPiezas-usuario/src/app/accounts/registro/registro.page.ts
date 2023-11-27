import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../productos.service';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  correo: string = '';
  password: string = '';

  constructor(private productosService: ProductosService, private router: Router) {}

  ngOnInit() {}

  registrar() {
    const userData = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password,
    };

    this.productosService.registrarUsuario(userData).subscribe(
      (response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);

          this.router.navigate(['/tabs/principal']);
        }
      },
      (error: any) => {
        console.error('Error en el registro:', error);
      }
    );
  }
}
