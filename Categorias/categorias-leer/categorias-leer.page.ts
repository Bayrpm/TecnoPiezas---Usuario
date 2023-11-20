import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AdminService } from '../../admin.service';
import { CLCategorias } from '../cmodel/CLCategorias'; 

@Component({
  selector: 'app-categorias-leer',
  templateUrl: './categorias-leer.page.html',
  styleUrls: ['./categorias-leer.page.scss'],
})
export class CategoriasLeerPage implements OnInit {
  categoria: CLCategorias[] = [];

  constructor(
    public categoriaService: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    // Suscribirse al evento de actualización
    this.categoriaService.onCategoriaUpdated().subscribe(() => {
      this.getCategorias();
    });
  }

  ngOnInit() {
    this.getCategorias();
  }

  async getCategorias() {
    const loading = await this.loadingController.create({ message: 'Cargando...' });
    await loading.present();

    try {
      this.categoriaService.getCategorias().subscribe((res: CLCategorias[]) => {
        this.categoria = res;
        loading.dismiss();
      });
    } catch (err) {
      console.log('Error al obtener categorias', err);
      loading.dismiss();
    }
  }

  async deleteCategoria(id_categoria: number) {
    this.presentAlertConfirm(id_categoria, 'Confirme la Eliminación, De lo contrario, Cancele');
  }

  async presentAlertConfirm(id_categoria: number, msg: string) {
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
            this.deleteCategoriaConfirmado(id_categoria);
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteCategoriaConfirmado(id_categoria: number) {
    console.log('Eliminando ' + id_categoria);
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    try {
      await this.categoriaService.deleteCategoria(id_categoria).subscribe(() => {
        console.log('Eliminado con éxito');
        // Llamar a la función para notificar la actualización
        this.categoriaService.notifyCategoriaUpdated();
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
