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

<<<<<<< HEAD
  constructor(private productosService: ProductosService) {
    this.productosService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos;
    });
  }





=======
  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.obtenerCarrito().subscribe((carrito) => {
      this.productosEnCarrito = carrito;
    });
  }

  vaciarCarrito() {
    this.productosService.vaciarCarrito();
  }

  aumentarCantidad(producto: Producto) {
    if (producto.stock > 0) {
      producto.stock--; // Aumenta la cantidad en el carrito y disminuye el stock
    }
  }
  

eliminarProducto(producto: Producto) {
  const index = this.productosEnCarrito.indexOf(producto);
  if (index !== -1) {
    // Aumenta el stock disponible al eliminar el producto
    producto.stock += 1; // Puedes ajustar la cantidad que deseas devolver al stock
    this.productosEnCarrito.splice(index, 1); // Elimina el producto del carrito
    this.productosService.actualizarCarrito(this.productosEnCarrito);
  }
>>>>>>> parent of db01b4d (Merge pull request #29 from Bayrpm/Cristóbal-Aravena)
}




}
