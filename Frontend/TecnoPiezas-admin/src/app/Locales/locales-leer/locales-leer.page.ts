import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { localesService } from '../locales.servicio';
import { CLLocales } from '../imodel/CLLocales';

@Component({
  selector: 'app-locales-leer',
  templateUrl: './locales-leer.page.html',
  styleUrls: ['./locales-leer.page.scss'],
})
export class LocalesLeerPage implements OnInit {
  locales: CLLocales[] = [];

  constructor(
    public restApi: localesService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    // Suscribirse al evento de actualización
    this.restApi.localUpdated.subscribe(() => {
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

  async deleteLocales(id: number) {
    this.presentAlertConfirm(id, 'Confirme la Eliminación, De lo contrario, Cancele');
  }

  async presentAlertConfirm(id: number, msg: string) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: msg,
      buttons: [
        {
          text: 'Eliminar : ' + id + " OK",
          handler: () => {
            this.deleteLocalesConfirmado(id);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteLocalesConfirmado(id: number) {
    console.log("Eliminando " + id);
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    try {
      await this.restApi.deleteLocales(id).subscribe(() => {
        console.log("Eliminado con éxito");
        this.restApi.localUpdated.emit(); // Emitir el evento de actualización
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
