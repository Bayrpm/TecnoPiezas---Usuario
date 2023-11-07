import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/productos.service';
import { Producto } from 'src/app/model/ClProducto';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.scss'],
})
export class DescripcionComponent implements OnInit {
  producto: Producto | null = null;
  errorMensaje: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const productoId = params.get('id');
      if (productoId) {
        const idNumerico = +productoId;
        if (!isNaN(idNumerico)) {
          this.productosService
            .obtenerProductoPorId(idNumerico)
            .subscribe((producto) => {
              if (producto) {
                this.producto = producto;
              } else {
                this.errorMensaje = 'El ID del producto no es válido.';
              }
            });
        } else {
          this.errorMensaje = 'El ID del producto no es un número válido.';
        }
      } else {
        this.errorMensaje = 'No se proporcionó un ID de producto en la URL.';
      }
    });
  }
}
