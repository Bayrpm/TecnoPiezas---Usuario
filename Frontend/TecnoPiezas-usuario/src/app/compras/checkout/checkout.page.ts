import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  numeroTarjeta: string = '';
  localSeleccionado: number = 0; // Puede ser el ID o cualquier identificador del local
  locales: any[] = []; // Obtén los locales disponibles

  constructor(private router: Router, private productosService: ProductosService) {
    this.obtenerLocales();
   }

  ngOnInit() {
  }

  obtenerLocales() {
    this.productosService.getLocales().subscribe(
      (data: any[]) => {
        this.locales = data;
      },
      (error) => {
        console.error('Error al obtener los locales:', error);
      }
    );
  }
// checkout.page.ts

realizarCompra() {
  if (this.localSeleccionado) {
    const carritoStr = localStorage.getItem('carrito');

    if (carritoStr !== null) {
      const carrito = JSON.parse(carritoStr);

      if (carrito && carrito.length > 0) {
        const data = {
          id_locales: this.localSeleccionado,
          productos: carrito
        };

        // Asegúrate de pasar ambos argumentos (id_locales y productos) a la función
        this.productosService.crearGuiaDespacho(data.id_locales, data.productos).subscribe(
          (response: any) => {
            console.log('Guía de despacho creada:', response);
            alert('Compra realizada con éxito');
            this.router.navigate(['/']);
          },
          (error: any) => {
            console.error('Error al crear la guía de despacho:', error);
          }
        );
      } else {
        alert('El carrito de compras está vacío');
      }
    } else {
      alert('El carrito de compras no existe en el localStorage');
    }
  } else {
    alert('Por favor, selecciona un local antes de realizar la compra.');
  }
}
}