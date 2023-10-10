import { Component } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Producto } from '../model/ClProducto';


@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss']
})
export class principalPage {

  images: string[] = [
    'https://media.spdigital.cl/file_upload/Mobile_Hero_2_2bdd4d61.png',
    'https://media.spdigital.cl/file_upload/Mobile_Hero_3_40708f1a.png',
    'https://media.spdigital.cl/file_upload/Mobile_Hero_3_40708f1a.png',
    // Agrega más URL de imágenes aquí
  ];
  productos: Producto[] = [];
  constructor(private productosService: ProductosService) {}
  ngOnInit(): void {
    this.cargarProductos();
  }
  cargarProductos() {
    this.productosService
      .obtenerTodosLosProductos()
      .subscribe((data) => {
        this.productos = data || [];
      });
  }
 
}


