import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Producto } from '../model/ClProducto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  productosEnCarrito: Producto[] = [];
  total: number = 0;
  

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.obtenerCarrito().subscribe((carrito) => {
      this.productosEnCarrito = carrito;
      this.calcularTotal();
    });
  }

  aumentarCantidad(producto: Producto): void {
    this.productosService.agregarAlCarrito(producto );
  }

  disminuirCantidad(producto: Producto): void {
    this.productosService.disminuirCantidad(producto);
  }
  

  eliminarDelCarrito(productoId: number): void {
    this.productosService.eliminarDelCarrito(productoId);
  }

  vaciarCarrito(): void {
    this.productosService.vaciarCarrito();
  }

  finalizarCompra(): void {
    this.productosService.finalizarCompra();
  }

  private calcularTotal(): void {
    this.total = this.productosEnCarrito.reduce(
      (total, producto) => total + producto.precio * producto.stock,
      0
    );
  }
}