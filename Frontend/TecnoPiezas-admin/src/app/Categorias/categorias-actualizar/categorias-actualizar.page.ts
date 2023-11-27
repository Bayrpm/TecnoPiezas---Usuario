import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CLCategorias } from '../cmodel/CLCategorias'; // 
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-categorias-actualizar',
  templateUrl: './categorias-actualizar.page.html',
  styleUrls: ['./categorias-actualizar.page.scss'],
})
export class CategoriasActualizarPage implements OnInit {
  categoriaForm!: FormGroup;
  categoria: CLCategorias = {
    id_categoria: NaN,
    nombre_categoria: '',
  };
  id_categoria: any = '';

  constructor(
    public categoriaService: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id_categoria = this.route.snapshot.params['id_categoria'];
    this.getCategoria(this.id_categoria);
    this.categoriaForm = this.formBuilder.group({
      nombre: [null, Validators.required],
      // Otros campos del formulario
    });
  }

  async onFormSubmit(formData: any) {
    this.categoria.id_categoria = this.id_categoria;
    this.categoria.nombre_categoria = formData.nombre;


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
  
    this.categoriaService.updateCategoria(this.id_categoria, this.categoria).subscribe(
      (res) => {
        this.getCategoria(this.id_categoria); // Cargar los datos actualizados
        this.router.navigate(['/categorias-leer']);
        // Puedes agregar notificación de actualización si lo necesitas
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async getCategoria(id_categoria: any) {
    await this.categoriaService.getCategoria(id_categoria).subscribe(
      (data) => {
        this.categoria = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
