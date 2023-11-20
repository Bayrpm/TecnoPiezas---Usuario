import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Producto } from '../model/ClProducto';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


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

  constructor(private productosService: ProductosService, private router: Router, private navCtrl: NavController) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.obtenerTodosLosProductos().subscribe((data) => {
      this.productos = data || [];
    });
  }

  navegarAProductosDetalles(idProducto: number) {
    this.productosService.getDetallesProducto(idProducto);

    // Después de obtener los detalles, puedes navegar a la página de detalles
    this.navCtrl.navigateForward(`/detalle/${idProducto}`);
  }

  agregarAlCarrito(producto: Producto): void {
    this.productosService.agregarAlCarrito(producto);
  }

}