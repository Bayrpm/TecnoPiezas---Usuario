import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AdminService } from '../../admin.service';
import { CLLocales } from '../imodel/CLLocales';

@Component({
  selector: 'app-locales-leer',
  templateUrl: './locales-leer.page.html',
  styleUrls: ['./locales-leer.page.scss'],
})
export class LocalesLeerPage implements OnInit {
  locales: CLLocales[] = [];

  constructor(
    public restApi: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    // Suscribirse al evento de actualización
    this.restApi.onLocalUpdated().subscribe(() => {
      this.getLocales();
    });
  }

  ngOnInit() {
    this.getLocales();
  }

  async getLocales() {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    try {
      this.restApi.getLocales().subscribe((res: CLLocales[]) => {
        this.locales = res;
        loading.dismiss();
      });
    } catch (err) {
      console.log("Error al obtener locales", err);
      loading.dismiss();
    }
  }

  async deleteLocales(id_locales: number) {
    this.presentAlertConfirm(id_locales, 'Confirme la Eliminación, De lo contrario, Cancele');
  }

  async presentAlertConfirm(id_locales: number, msg: string) {
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
            this.deleteLocalesConfirmado(id_locales);
          },
        },
      ],
    });
    await alert.present();
  }
  

  async deleteLocalesConfirmado(id_locales: number) {
    console.log("Eliminando " + id_locales);
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  
    try {
      await this.restApi.deleteLocales(id_locales).subscribe(() => {
        console.log("Eliminado con éxito");
        // Llamar a la función para notificar la actualización
        this.restApi.notifyLocalUpdated();
        loading.dismiss();
      }, (err) => {
        console.log("Error al eliminar el local", err);
        loading.dismiss();
      });
    } catch (err) {
      console.log("Error al eliminar el local", err);
      loading.dismiss();
    }
  }
}
