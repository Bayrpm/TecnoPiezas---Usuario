import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../productos.service'; // Asegúrate de reemplazar con la ruta correcta

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  cantidadEnCarrito: number = 0;

  constructor(private router: Router, private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.carrito$.subscribe((carrito) => {
      this.cantidadEnCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
