import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CLLocales } from '../imodel/CLLocales';
import { localesService } from '../locales.servicio';

@Component({
  selector: 'app-locales-actualizar',
  templateUrl: './locales-actualizar.page.html',
  styleUrls: ['./locales-actualizar.page.scss'],
})
export class LocalesActualizarPage implements OnInit {
  localesForm!: FormGroup;
  locales: CLLocales = {
    id: NaN,
    direccion: '',
    descripcion: '',
    correo: '',
    telefono: '',
  };
  id: any = '';

  constructor(
    public restApi: localesService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getLocal(this.id);
    this.localesForm = this.formBuilder.group({
      loc_direc: [null, Validators.required],
      loc_desp: [null, Validators.required],
      loc_correo: [null, Validators.required],
      loc_telef: [null, Validators.required],
    });
  }

  async onFormSubmit(formData: any) {
    this.locales.id = this.id;
    this.locales.direccion = formData.loc_direc;
    this.locales.descripcion = formData.loc_desp;
    this.locales.correo = formData.loc_correo;
    this.locales.telefono = formData.loc_telef;

    const confirmAlert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Desea modificar los datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.updateLocales();
          },
        },
      ],
    });

    await confirmAlert.present();
  }

  async updateLocales() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });

    await loading.present();

    await this.restApi.updateLocales(this.id, this.locales).subscribe({
      next: (res) => {
        if (this.id) {
          this.restApi.localUpdated.emit(); // Emitir el evento de actualización
          this.router.navigate(['/locales-leer']);
        }
      },
      complete: () => {
        loading.dismiss();
      },
      error: (err) => {
        console.log(err);
        loading.dismiss();
      },
    });
  }

  async getLocal(id: string) {
    await this.restApi.getLocal(id).subscribe(
      (data) => {
        this.locales = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
