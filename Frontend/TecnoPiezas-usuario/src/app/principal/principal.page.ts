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

  navegarAOtraPagina(producto_id: number) {
    this.navCtrl.navigateForward(`/descripcion/1/${producto_id}`);
  }

agregarAlCarrito(producto: Producto) {
  // Asegúrate de que 'producto' sea un objeto válido antes de llamar a esta función
  this.productosService.agregarAlCarrito(producto);
}

}
