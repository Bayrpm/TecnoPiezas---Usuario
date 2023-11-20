import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductosService} from '../productos.service';
import { Producto } from '../model/ClProducto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  mostrarDescripcion = false; 
  productoDetalles: any;
  productos: Producto[] = [];

  constructor(private navCtrl: NavController, private productService: ProductosService, private router: Router) { }

  ngOnInit() {
    // Suscribirse a los cambios en los detalles del producto
    this.productService.detalle$.subscribe((detalle) => {
      this.productoDetalles = detalle;
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.productService.agregarAlCarrito(producto);
  }

}
