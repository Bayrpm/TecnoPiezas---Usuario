import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Producto } from '../model/ClProducto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  productosEnCarrito: Producto[] = [];

  constructor(private productosService: ProductosService) {
    this.productosService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos;
    });
  }

  decreaseCartItem(producto: Producto) {
    this.productosService.decreaseCartItem(producto);
  }

  increaseCartItem(producto: Producto) {
    this.productosService.addToCarrito(producto);
  }

  removeCartItem(producto: Producto) {
    this.productosService.removeCartItem(producto);
  }

  getTotal() {
    return this.productosEnCarrito.reduce((total, producto) => total + producto.precio * producto.stock, 0);
  }


  vaciarCarrito() {
    this.productosService.clearCart();
  }
  actualizarLocalStorage() {
    this.productosService.updateLocalStorage();
  }
}
