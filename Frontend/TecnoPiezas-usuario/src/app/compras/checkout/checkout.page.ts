import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../productos.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  numeroTarjeta: string = '';
  localSeleccionado: number = 0; // Puede ser el ID o cualquier identificador del local
  locales: any[] = []; // Obtén los locales disponibles
  ultimosNumerosTarjeta: string = ''; // Variable para almacenar los últimos 4 dígitos de la tarjeta

  constructor(
    private router: Router,
    private productosService: ProductosService,
    private toastController: ToastController
  ) {
    this.obtenerLocales();
  }

  ngOnInit() {}

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

  async realizarCompra() {
    if (this.localSeleccionado) {
      const carritoStr = localStorage.getItem('carrito');
  
      if (carritoStr !== null) {
        const carrito = JSON.parse(carritoStr);
  
        if (carrito && carrito.length > 0) {
          const data = {
            id_locales: this.localSeleccionado,
            productos: carrito,
          };
  
          this.ultimosNumerosTarjeta = this.numeroTarjeta.slice(-4);
  
          try {
            // Simulación de la función crearGuiaDespacho
            // Reemplaza esto con tu llamada real al servicio
            const response = await this.simularCompra(data.id_locales, data.productos);
  
            // Elimina el carrito después de realizar la compra
            localStorage.removeItem('carrito');
  
            // Actualiza la variable local también para asegurarse de que la interfaz de usuario refleje el cambio
            carrito.length = 0;
  
            // Duplicated logic to update the carrito within the realizarCompra method
            this.productosService.carrito = carrito;
            this.productosService.actualizarCarrito();
  
            const mensaje = `Compra realizada con éxito. BOLETA Detalles:\n${JSON.stringify(response, null, 2)}\nÚltimos 4 dígitos de la tarjeta: ${this.ultimosNumerosTarjeta}\nLocal: ${this.localSeleccionado}`;
  
            this.mostrarToast(mensaje, 'success');
            this.router.navigate(['/']);
          } catch (error) {
            console.error('Error al crear la guía de despacho:', error);
  
            const mensajeError = `Error al crear la guía de despacho. Detalles:\n${JSON.stringify(error, null, 2)}\nÚltimos 4 dígitos de la tarjeta: ${this.ultimosNumerosTarjeta}\nLocal: ${this.localSeleccionado}`;
  
            this.mostrarToast(mensajeError, 'danger');
          }
        } else {
          this.mostrarToast('El carrito de compras está vacío', 'danger');
        }
      } else {
        this.mostrarToast('El carrito de compras no existe en el localStorage', 'danger');
      }
    } else {
      this.mostrarToast('Por favor, selecciona un local antes de realizar la compra.', 'danger');
    }
  }
  
  async simularCompra(idLocal: number, productos: any[]): Promise<any> {
    return new Promise((resolve) => {
      // Simulación de una llamada asíncrona
      setTimeout(() => {
        resolve({ mensaje: 'Compra realizada exitosamente' });
      }, 1000);
    });
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 30000, // Duración del Toast en milisegundos
      color: color,
      position: 'bottom', // Posición del Toast: 'top', 'bottom', 'middle'
      buttons: [
        {
          side: 'end', // Posición del botón: 'start', 'end'
          text: 'Cerrar',
        },
      ],
    });
  
    toast.present();
  }
}
