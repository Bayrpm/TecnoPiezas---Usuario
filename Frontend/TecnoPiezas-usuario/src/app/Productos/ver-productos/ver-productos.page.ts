import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../productos.service';

import { Producto } from '../../model/ClProducto';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.page.html',
  styleUrls: ['./ver-productos.page.scss'],
})
export class VerProductosPage implements OnInit {

  productos: Producto[] = [];
  productosFiltrados: any[] = [];

// Asegúrate de que esta línea esté presente

  constructor(private productosService: ProductosService) {
 
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.obtenerTodosLosProductos().subscribe((data) => {
      this.productos = data || [];
    });
  }

  aplicarFiltros(productosFiltrados: any[]): void {
    this.productosFiltrados = productosFiltrados;
  }
  agregarAlCarrito(producto: Producto): void {
    this.productosService.agregarAlCarrito(producto);
  }


}
