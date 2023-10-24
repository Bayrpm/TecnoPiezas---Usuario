import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CLBodegas } from '../bmodel/CLBodegas'; // 
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-bodegas-actualizar',
  templateUrl: './bodegas-actualizar.page.html',
  styleUrls: ['./bodegas-actualizar.page.scss'],
})
export class BodegasActualizarPage implements OnInit {
  bodegaForm!: FormGroup;
  bodega: CLBodegas = {
    id_bodega: NaN,
    direccion: '',
    capacidad: NaN, // Reemplaza con el tipo correcto para la capacidad
    // Otros campos de tu entidad Bodega
  };
  id_bodega: any = '';

  constructor(
    public bodegaService: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id_bodega = this.route.snapshot.params['id_bodega'];
    this.getBodega(this.id_bodega);
    this.bodegaForm = this.formBuilder.group({
      'direccion': [null, Validators.required],
      'capacidad': [null, Validators.required],
      // Otros campos del formulario
    });
  }

  async onFormSubmit(formData: any) {
    this.bodega.id_bodega = this.id_bodega;
    this.bodega.direccion = formData.direccion;
    this.bodega.capacidad = formData.capacidad;

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
            this.updateBodega();
          },
        },
      ],
    });

    await confirmAlert.present();
  }

  async updateBodega() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
  
    await loading.present();
  
    this.bodegaService.updateBodega(this.id_bodega, this.bodega).subscribe(
      (res) => {
        this.getBodega(this.id_bodega); // Cargar los datos actualizados
        this.router.navigate(['/bodega-leer']);
        // Puedes agregar notificación de actualización si lo necesitas
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async getBodega(id_bodega: any) {
    await this.bodegaService.getBodega(id_bodega).subscribe(
      (data) => {
        this.bodega = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
