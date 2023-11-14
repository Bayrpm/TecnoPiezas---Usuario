import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../productos.service';
import { Producto } from '../../model/ClProducto';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.page.html',
  styleUrls: ['./ver-productos.page.scss'],
})
export class VerProductosPage implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: any[] = [];

  constructor(private productosService: ProductosService) {}

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
<<<<<<< HEAD


  
 
  

=======
>>>>>>> parent of db01b4d (Merge pull request #29 from Bayrpm/Cristóbal-Aravena)
}
