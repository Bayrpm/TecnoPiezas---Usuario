import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CLProductos } from '../pmodel/CLProductos';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-productos-actualizar',
  templateUrl: './productos-actualizar.page.html',
  styleUrls: ['./productos-actualizar.page.scss'],
})
export class ProductosActualizarPage implements OnInit {
  productosForm!: FormGroup;
  producto: CLProductos = {
    producto_id: NaN,
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
    imagen: '',
    categoria: NaN,
    subcategoria: NaN,
    nuevoCampo: ''
  };
  producto_id: any = '';

  constructor(
    public restApi: AdminService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {
    this.producto_id = this.route.snapshot.params['producto_id'];
    this.getProducto(this.producto_id);
    this.productosForm = this.formBuilder.group({
      pro_nom: [null, Validators.required],
      pro_precio: [null, Validators.required],
      pro_stock: [null, Validators.required],
      pro_desc: [null, Validators.required],
      pro_img: [null, Validators.required],
      pro_cate: [null, Validators.required],
      pro_subcate: [null, Validators.required],
    });
  }

  async onFormSubmit(formData: any) {
    this.producto.producto_id = this.producto_id;
    this.producto.nombre = formData.pro_nom;
    this.producto.precio = formData.pro_precio;
    this.producto.stock = formData.pro_stock;
    this.producto.descripcion = formData.pro_desc;
    this.producto.imagen = formData.pro_img;
    this.producto.categoria = formData.pro_cate;
    this.producto.subcategoria = formData.pro_subcate;
    this.producto.nuevoCampo = 'Valor de la imagen';

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
            this.updateProductos();
          },
        },
      ],
    });

    await confirmAlert.present();
  }

  async updateProductos() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
  
    await loading.present();
  
    this.restApi.updateProductos(this.producto_id, this.producto).subscribe(
      (res) => {
        this.getProducto(this.producto_id); // Cargar los datos actualizados
        this.router.navigate(['/productos-leer']);
        this.restApi.notifyProductoUpdated(); // Notificar la actualización
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async getProducto(producto_id: any) {
    await this.restApi.getProducto(producto_id).subscribe(
      (data) => {
        this.producto = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

