import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AdminService } from '../../admin.service';
import { CLSub } from '../smodel/CLSub'; 

@Component({
  selector: 'app-sub-categorias-leer',
  templateUrl: './sub-categorias-leer.page.html',
  styleUrls: ['./sub-categorias-leer.page.scss'],
})
export class SubCategoriasLeerPage implements OnInit {
  subcategorias: CLSub[] = [];

  constructor(
    public subService: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    // Suscribirse al evento de actualización
    this.subService.onSubUpdated().subscribe(() => {
      this.getSubs();
    });
  }

  ngOnInit() {
    this.getSubs();
  }

  async getSubs() {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    try {
      this.subService.getSubs().subscribe((res: CLSub[]) => {
        this.subcategorias = res;
        loading.dismiss();
      });
    } catch (err) {
      console.log('Error al obtener Subs', err);
      loading.dismiss();
    }
  }

  async deleteSub(subcategoria_id: number) {
    this.presentAlertConfirm(subcategoria_id, 'Confirme la Eliminación, De lo contrario, Cancele');
  }

  async presentAlertConfirm(subcategoria_id: number, msg: string) {
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
            this.deleteSubConfirmado(subcategoria_id);
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteSubConfirmado(subcategoria_id: number) {
    console.log('Eliminando ' + subcategoria_id);
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    try {
      await this.subService.deleteSub(subcategoria_id).subscribe(() => {
        console.log('Eliminado con éxito');
        // Llamar a la función para notificar la actualización
        this.subService.notifySubUpdated();
        loading.dismiss();
      }, (err) => {
        console.log('Error al eliminar la Sub', err);
        loading.dismiss();
      });
    } catch (err) {
      console.log('Error al eliminar la Sub', err);
      loading.dismiss();
    }
  }
}

