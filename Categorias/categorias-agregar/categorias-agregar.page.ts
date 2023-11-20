import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CLCategorias } from '../cmodel/CLCategorias';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-categorias-agregar',
  templateUrl: './categorias-agregar.page.html',
  styleUrls: ['./categorias-agregar.page.scss'],
})
export class CategoriasAgregarPage implements OnInit {
  categoriaForm!: FormGroup;
  categoria: CLCategorias = {
    id_categoria: 0,
    nombre_categoria: '',

  };

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private categoriaService: AdminService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      nombre: [this.categoria.nombre_categoria, Validators.required],
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

    this.categoriaService.addCategoria(this.categoria).subscribe({
      next: async (res) => {
        console.log('Siguiente en AddCategoria Page', res);
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
          this.router.navigate(['/categorias-home']);
        }, 1000);
      },
      complete: () => {},
      error: (err) => {
        console.log('Error en la página AddCategoria', err);
        loading.dismiss();
      },
    });
  }
}
