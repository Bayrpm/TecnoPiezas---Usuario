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





}
