import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../productos.service';
import { Producto } from '../../model/ClProducto';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.page.html',
  styleUrls: ['./ver-productos.page.scss'],
})
export class VerProductosPage implements OnInit {
  productosEnCarrito: Producto[] = [];
  productos: Producto[] = [];
  productosFiltrados: any[] = [];

  constructor(private productosService: ProductosService) {
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

  aplicarFiltros(productosFiltrados: any[]): void {
    this.productosFiltrados = productosFiltrados;
  }

addToCarrito(producto: Producto) {
  const nuevoProducto = { ...producto, stock: 1 }; // Clona el producto y establece la cantidad en 1
  this.productosService.addToCarrito(nuevoProducto);
}


}
