import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-agregar-admin',
  templateUrl: './agregar-admin.page.html',
  styleUrls: ['./agregar-admin.page.scss'],
})
export class AgregarAdminPage implements OnInit {

  nombre!: string;
  apellido!: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  agregarAdministrador() {
    this.adminService.agregarAdmin(this.nombre, this.apellido).subscribe(
      (response) => {
        console.log('Administrador agregado:', response);
      },
      (error) => {
        console.error('Error al agregar administrador:', error);
      }
    );
  }

}
