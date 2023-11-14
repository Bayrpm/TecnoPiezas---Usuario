import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/productos.service';
import { Producto } from 'src/app/model/ClProducto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.scss'],
})
export class DescripcionComponent  implements OnInit {
  precio: number;
  images: string[] = [
    'https://media.spdigital.cl/file_upload/Mobile_Hero_2_2bdd4d61.png',
    'https://media.spdigital.cl/file_upload/Mobile_Hero_3_40708f1a.png',
    'https://media.spdigital.cl/file_upload/Mobile_Hero_3_40708f1a.png',
    // Agrega más URL de imágenes aquí
  ];

  isDescriptionVisible = true;
  isSpecsVisible = true;
  isWarrantyVisible = true;
  isContactVisible = true;

   // Agrega métodos para alternar la visibilidad
   toggleDescription() {
    this.isDescriptionVisible = !this.isDescriptionVisible;
  }

  toggleSpecs() {
    this.isSpecsVisible = !this.isSpecsVisible;
  }

  toggleWarranty() {
    this.isWarrantyVisible = !this.isWarrantyVisible;
  }

  toggleContact() {
    this.isContactVisible = !this.isContactVisible;
  }

  productos: Producto[] = [];

  constructor(private productosService: ProductosService, private router: Router) { 
    this.precio = 999.99;
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.obtenerTodosLosProductos().subscribe((data) => {
      this.productos = data || [];
    });
  }
  agregarAlCarrito(producto: Producto): void {
    this.productosService.agregarAlCarrito(producto);
  }


}
