import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Producto } from '../model/ClProducto';
import { AlertController } from '@ionic/angular';
import {AuthService} from '../auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss']
})
export class PrincipalPage implements OnInit {
  images: string[] = [
    'https://media.spdigital.cl/file_upload/Mobile_Hero_2_2bdd4d61.png',
    'https://media.spdigital.cl/file_upload/Mobile_Hero_3_40708f1a.png',
    'https://media.spdigital.cl/file_upload/Mobile_Hero_3_40708f1a.png',
    // Agrega más URL de imágenes aquí
  ];
  productos: Producto[] = [];
  productosEnCarrito: Producto[] = [];

  constructor(private productosService: ProductosService, private alertController: AlertController,private authService: AuthService, private router: Router) {
    this.productosService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos;
    });
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.obtenerTodosLosProductos().subscribe((data) => {
      this.productos = data || [];
    });
  }

  async addToCarrito(producto: Producto) {
    if (this.authService.isLoggedIn()) { // Usa el método isLoggedIn del servicio AuthService
      // Usuario autenticado
      this.productosService.addToCarrito(producto);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se ha añadido un producto al carrito',
        buttons: [
          {
            text: 'Ver carrito',
            handler: () => {
              this.router.navigate(['/tab3']);
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
    } else {
      // Usuario no autenticado
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Debe iniciar sesión para agregar productos',
        buttons: [
          {
            text: 'Iniciar Sesión',
            handler: () => {
              this.router.navigate(['/login']);
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
    }
  }
}
