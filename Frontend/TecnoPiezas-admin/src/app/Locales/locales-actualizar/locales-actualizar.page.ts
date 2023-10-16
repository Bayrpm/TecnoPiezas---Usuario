import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CLLocales } from '../imodel/CLLocales';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-locales-actualizar',
  templateUrl: './locales-actualizar.page.html',
  styleUrls: ['./locales-actualizar.page.scss'],
})
export class LocalesActualizarPage implements OnInit {
  localesForm!: FormGroup;
  locales: CLLocales = {
    id_locales: NaN,
    direccion: '',
    descripcion: '',
    correo: '',
    telefono: '',
  };
  id_locales: any = '';

  constructor(
    public restApi: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {
    this.id_locales = this.route.snapshot.params['id_locales'];
    this.getLocal(this.id_locales);
    this.localesForm = this.formBuilder.group({
      loc_direc: [null, Validators.required],
      loc_desp: [null, Validators.required],
      loc_correo: [null, Validators.required],
      loc_telef: [null, Validators.required],
    });
  }

  async onFormSubmit(formData: any) {
    this.locales.id_locales = this.id_locales;
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
  
    this.restApi.updateLocales(this.id_locales, this.locales).subscribe(
      (res) => {
        this.getLocal(this.id_locales); // Cargar los datos actualizados
        this.router.navigate(['/locales-leer']);
        this.restApi.notifyLocalUpdated(); // Notificar la actualización
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async getLocal(id_locales: any) {
    await this.restApi.getLocal(id_locales).subscribe(
      (data) => {
        this.locales = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
