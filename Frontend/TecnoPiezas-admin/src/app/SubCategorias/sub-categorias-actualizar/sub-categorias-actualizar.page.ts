import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CLSub } from '../smodel/CLSub'; // 
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-sub-categorias-actualizar',
  templateUrl: './sub-categorias-actualizar.page.html',
  styleUrls: ['./sub-categorias-actualizar.page.scss'],
})
export class SubCategoriasActualizarPage implements OnInit {
  subForm!: FormGroup;
  subcategoria: CLSub = {
    subcategoria_id: NaN,
    nombre_subcategoria: '',
    categoria: NaN, // Reemplaza con el tipo correcto para la capacidad
    // Otros campos de tu entidad subcategoria
  };
  subcategoria_id: any = '';

  constructor(
    public subService: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.subcategoria_id = this.route.snapshot.params['subcategoria_id'];
    this.getSub(this.subcategoria_id);
    this.subForm = this.formBuilder.group({
      sub_nombre: [null, Validators.required],
      sub_cate: [null, Validators.required],
      // Otros campos del formulario
    });
  }

  async onFormSubmit(formData: any) {
    this.subcategoria.subcategoria_id = this.subcategoria_id;
    this.subcategoria.nombre_subcategoria = formData.nombre_subcategoria;
    this.subcategoria.categoria = formData.categoria;

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
            this.updateSub();
          },
        },
      ],
    });

    await confirmAlert.present();
  }

  async updateSub() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
  
    await loading.present();
  
    this.subService.updateSub(this.subcategoria_id, this.subcategoria).subscribe(
      (res) => {
        this.getSub(this.subcategoria_id); // Cargar los datos actualizados
        this.router.navigate(['/sub-categoria-leer']);
        // Puedes agregar notificación de actualización si lo necesitas
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async getSub(subcategoria_id: any) {
    await this.subService.getSub(subcategoria_id).subscribe(
      (data) => {
        this.subcategoria = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
