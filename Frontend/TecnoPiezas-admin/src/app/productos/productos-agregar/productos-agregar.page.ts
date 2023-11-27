import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CLProductos } from '../pmodel/CLProductos';
import { AdminService, ImageUploadService } from '../../admin.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos-agregar',
  templateUrl: './productos-agregar.page.html',
  styleUrls: ['./productos-agregar.page.scss'],
})
export class ProductosAgregarPage implements OnInit {
  productosForm!: FormGroup;
  producto: CLProductos = {
    producto_id: 0,
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
    imagen: '',
    categoria: 0,
    subcategoria: 0,
    nuevoCampo: '',
  };

  apiUrl: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private restApi: AdminService,
    private router: Router,
    private alertController: AlertController,
    private imageUploadService: ImageUploadService
  ) {
    this.apiUrl = 'http://localhost:8000/api';
  }

  ngOnInit() {
    this.productosForm = this.formBuilder.group({
      pro_nom: [null, [Validators.required, Validators.maxLength(50)]],
      pro_precio: [null, [Validators.required, Validators.min(0)]],
      pro_stock: [null, [Validators.required, Validators.min(0)]],
      pro_desc: [null, [Validators.required, Validators.maxLength(255)]],
      pro_img: [null, Validators.compose([Validators.required, Validators.required])],
      pro_cate: [null, Validators.required],
      pro_subcate: [null, Validators.required],
    });

    // Inicializar producto_id aquí o en cualquier otro lugar según la lógica de tu aplicación
    // this.producto.producto_id = ...;
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

  onImageSelected(event: Event) {
    console.log('Valor de producto_id:', this.producto.producto_id);
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];

      // Verificar si this.producto.producto_id es un número válido
      if (!isNaN(this.producto.producto_id) && isFinite(this.producto.producto_id)) {
        this.uploadImageToServer(file, this.producto.producto_id).subscribe(
          (imageUrl) => {
            this.producto.imagen = imageUrl;
          },
          (error) => {
            console.error('Error al cargar la imagen:', error);
          }
        );
      } else {
        console.error('this.producto.producto_id no es un número válido.');
        // Puedes mostrar un mensaje al usuario u otra lógica de manejo
      }
    }
  }

  uploadImageToServer(file: File, producto_id: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/productos/upload-image/${producto_id}`, formData).pipe(
      catchError((error) => {
        console.error('Error en la carga de la imagen:', error);
        throw error;
      })
    );
  }

  async guardarDatos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });

    try {
      await loading.present();

      const res = await this.restApi.addProductos(this.producto).toPromise();

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
        this.router.navigate(['/productos-home']);
      }, 1000);
    } catch (err) {
      console.log('Error en la página AddProductos', err);

      const errorAlert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.',
        buttons: ['OK'],
      });

      await errorAlert.present();
    } finally {
      loading.dismiss();
    }
  }
}