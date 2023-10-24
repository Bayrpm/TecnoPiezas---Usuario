import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CLBodegas } from '../bmodel/CLBodegas';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-bodegas-agregar',
  templateUrl: './bodegas-agregar.page.html',
  styleUrls: ['./bodegas-agregar.page.scss'],
})
export class BodegasAgregarPage implements OnInit {
  bodegasForm!: FormGroup;
  bodegas: CLBodegas = {
    id_bodega: 0,
    direccion: '',
    capacidad: 0,
    // Otros campos de tu entidad Bodega
  };

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private bodegaService: AdminService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.bodegasForm = this.formBuilder.group({
      direccion: [this.bodegas.direccion, Validators.required],
      capacidad: [this.bodegas.capacidad, Validators.required],
      // Otros campos del formulario
    });
  }

  async onFormSubmit() {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea confirmar los datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.guardarDatos();
          },
        },
      ],
    });

    await confirmAlert.present();
  }

  async guardarDatos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.bodegaService.addBodega(this.bodegas).subscribe({
      next: async (res) => {
        console.log('Siguiente en AddBodega Page', res);
        loading.dismiss();

        if (res == null) {
          console.log('No se agregó');
          return;
        }

        const alert = await this.alertController.create({
          header: '¡Gracias!',
          message: 'Tus datos se han guardado.',
          buttons: ['OK'],
        });

        await alert.present();

        setTimeout(() => {
          this.router.navigate(['/bodega-home']);
        }, 1000);
      },
      complete: () => {},
      error: (err) => {
        console.log('Error en la página AddBodega', err);
        loading.dismiss();
      },
    });
  }
}
