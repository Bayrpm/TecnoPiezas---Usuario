import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AdminService } from '../../admin.service';
import { CLProductos } from '../pmodel/CLProductos';

@Component({
  selector: 'app-productos-leer',
  templateUrl: './productos-leer.page.html',
  styleUrls: ['./productos-leer.page.scss'],
})
export class ProductosLeerPage implements OnInit {
  producto: CLProductos[] = [];

  constructor(
    public restApi: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    // Suscribirse al evento de actualización
    this.restApi.onProductoUpdated().subscribe(() => {
      this.getProductos();
    });
  }

  ngOnInit() {
    this.getProductos();
  }

  async getProductos() {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    try {
      this.restApi.getProductos().subscribe((res: CLProductos[]) => {
        this.producto = res;
        loading.dismiss();
      });
    } catch (err) {
      console.log("Error al obtener producto", err);
      loading.dismiss();
    }
  }

  async deleteProductos(producto_id: number) {
    this.presentAlertConfirm(producto_id, 'Confirme la Eliminación, De lo contrario, Cancele');
  }

  async presentAlertConfirm(producto_id: number, msg: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.deleteProductosConfirmado(producto_id);
          },
        },
      ],
    });
    await alert.present();
  }
  

  async deleteProductosConfirmado(productos_id: number) {
    console.log("Eliminando " + productos_id);
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  
    try {
      await this.restApi.deleteProductos(productos_id).subscribe(() => {
        console.log("Eliminado con éxito");
        // Llamar a la función para notificar la actualización
        this.restApi.notifyProductoUpdated();
        loading.dismiss();
      }, (err) => {
        console.log("Error al eliminar el Producto", err);
        loading.dismiss();
      });
    } catch (err) {
      console.log("Error al eliminar el Producto", err);
      loading.dismiss();
    }
  }
}
