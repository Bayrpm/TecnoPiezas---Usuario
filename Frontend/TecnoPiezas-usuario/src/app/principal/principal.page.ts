import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Producto } from '../model/ClProducto';
import { Router } from '@angular/router';



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

  constructor(private productosService: ProductosService, private router: Router) {}
  
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.obtenerTodosLosProductos().subscribe((data) => {
      this.productos = data || [];
    });
  }

  navegarAOtraPagina() {
    this.router.navigate(['/descripcion/1']);
  }

  agregarAlCarrito(producto: Producto): void {
    this.productosService.agregarAlCarrito(producto);
  }

}