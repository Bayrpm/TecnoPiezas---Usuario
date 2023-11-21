import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductosService } from '../productos.service';
import { Producto } from '../model/ClProducto';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
declare var google: any;


@Component({
  selector: 'app-principal',
  templateUrl: 'principal.page.html',
  styleUrls: ['principal.page.scss']
})
export class PrincipalPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  map: any;
  images: string[] = [
    'https://media.spdigital.cl/file_upload/Mobile_Hero_2_2bdd4d61.png',
    'https://media.spdigital.cl/file_upload/Mobile_Hero_3_40708f1a.png',
    'https://media.spdigital.cl/file_upload/Mobile_Hero_3_40708f1a.png',
    // Agrega más URL de imágenes aquí
  ];
  productos: Producto[] = [];

  constructor(private productosService: ProductosService, private router: Router, private navCtrl: NavController) {}
  
  ngOnInit(): void {
    this.cargarProductos();
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
    });
  }

  private loadGoogleMapsScript(): Promise<void> {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAXWQjGCFqMyPOFX7qh1Nz3LUSec-PKHwc';
    script.async = true;
    script.defer = true;

    return new Promise((resolve, reject) => {
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  private initMap() {
    const mapOptions = {
      center: new google.maps.LatLng(-33.59217, -70.6996),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  cargarProductos() {
    this.productosService.obtenerTodosLosProductos().subscribe((data) => {
      this.productos = data || [];
    });
  }

  navegarAProductosDetalles(idProducto: number) {
    this.productosService.getDetallesProducto(idProducto);
  
    // Después de obtener los detalles, puedes navegar a la página de detalles
    this.navCtrl.navigateForward(`/detalle/${idProducto}`);
  }

agregarAlCarrito(producto: Producto) {
  // Asegúrate de que 'producto' sea un objeto válido antes de llamar a esta función
  this.productosService.agregarAlCarrito(producto);
}

}
