import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AdminService } from '../../admin.service';
import { CLBodegas } from '../bmodel/CLBodegas'; 

@Component({
  selector: 'app-bodegas-leer',
  templateUrl: './bodegas-leer.page.html',
  styleUrls: ['./bodegas-leer.page.scss'],
})
export class BodegasLeerPage implements OnInit {
  bodegas: CLBodegas[] = [];

  constructor(
    public bodegaService: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    // Suscribirse al evento de actualización
    this.bodegaService.onBodegaUpdated().subscribe(() => {
      this.getBodegas();
    });
  }

  ngOnInit() {
    this.getBodegas();
  }

  async getBodegas() {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    try {
      this.bodegaService.getBodegas().subscribe((res: CLBodegas[]) => {
        this.bodegas = res;
        loading.dismiss();
      });
    } catch (err) {
      console.log('Error al obtener bodegas', err);
      loading.dismiss();
    }
  }

  async deleteBodega(id_bodega: number) {
    this.presentAlertConfirm(id_bodega, 'Confirme la Eliminación, De lo contrario, Cancele');
  }

  async presentAlertConfirm(id_bodega: number, msg: string) {
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
            this.deleteBodegaConfirmado(id_bodega);
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteBodegaConfirmado(id_bodega: number) {
    console.log('Eliminando ' + id_bodega);
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    try {
      await this.bodegaService.deleteBodega(id_bodega).subscribe(() => {
        console.log('Eliminado con éxito');
        // Llamar a la función para notificar la actualización
        this.bodegaService.notifyBodegaUpdated();
        loading.dismiss();
      }, (err) => {
        console.log('Error al eliminar la bodega', err);
        loading.dismiss();
      });
    } catch (err) {
      console.log('Error al eliminar la bodega', err);
      loading.dismiss();
    }
  }
}
