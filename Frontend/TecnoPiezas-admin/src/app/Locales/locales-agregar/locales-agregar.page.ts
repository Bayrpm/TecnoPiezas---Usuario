import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CLLocales } from '../imodel/CLLocales';
import { localesService } from '../locales.servicio';

@Component({
  selector: 'app-locales-agregar',
  templateUrl: './locales-agregar.page.html',
  styleUrls: ['./locales-agregar.page.scss'],
})
export class LocalesAgregarPage implements OnInit {
  localesForm!: FormGroup;
  locales: CLLocales = {
    id: NaN,
    direccion: '',
    descripcion: '',
    correo: '',
    telefono: '+56 9'
  };

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: localesService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.localesForm = this.formBuilder.group({
      loc_direc: [this.locales.direccion, Validators.required],
      loc_desp: [this.locales.descripcion, Validators.required],
      loc_correo: [this.locales.correo, Validators.required],
      loc_telef: [this.locales.telefono, [Validators.required]],
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
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.guardarDatos();
          }
        }
      ]
    });

    await confirmAlert.present();
  }

  async guardarDatos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    this.restApi.addLocales(this.locales).subscribe({
      next: async (res) => {
        console.log("Siguiente en AddLocales Page", res);
        loading.dismiss();

        if (res == null) {
          console.log("No se agregó");
          return;
        }

        const alert = await this.alertController.create({
          header: '¡Gracias!',
          message: 'Tus datos se han guardado.',
          buttons: ['OK']
        });

        await alert.present();

        setTimeout(() => {
          this.router.navigate(['/locales-home']);
        }, 1000);
      },
      complete: () => { },
      error: (err) => {
        console.log("Error en la página AddLocales", err);
        loading.dismiss();
      }
    });
  }
  onPhoneNumberInput(event: any) {
    const value = event.target.value.replace(/[^\d+]/g, ''); // Deja solo el signo '+' y números
    let formattedValue = ' ';
  
    for (let i = 0; i < value.length; i++) {
      formattedValue += value[i];
      if (i === 2 || i === 3|| i === 7) {
        formattedValue += ' '; // Agregar un espacio después del cuarto dígito
      }
    }
  
    this.locales.telefono = formattedValue;
  }
  

}
