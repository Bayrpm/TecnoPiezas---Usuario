import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CLSub } from '../smodel/CLSub';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-sub-categorias-agregar',
  templateUrl: './sub-categorias-agregar.page.html',
  styleUrls: ['./sub-categorias-agregar.page.scss'],
})
export class SubCategoriasAgregarPage implements OnInit {
  subForm!: FormGroup;
  subcategoria: CLSub = {
    subcategoria_id: 0,
    nombre_subcategoria: '',
    categoria: 0, // Reemplaza con el tipo correcto para la capacidad
    // Otros campos de tu entidad subcategoria
  };


  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private subService: AdminService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.subForm = this.formBuilder.group({
      sub_nombre: [this.subcategoria.nombre_subcategoria, Validators.required],
      sub_cate: [this.subcategoria.categoria, Validators.required],
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

    this.subService.addSub(this.subcategoria).subscribe({
      next: async (res) => {
        console.log('Siguiente en AddSub Page', res);
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
          this.router.navigate(['/sub-categorias-home']);
        }, 1000);
      },
      complete: () => {},
      error: (err) => {
        console.log('Error en la página AddSub', err);
        loading.dismiss();
      },
    });
  }
}
