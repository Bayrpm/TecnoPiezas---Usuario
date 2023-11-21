import { Component, OnInit } from '@angular/core';

import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {

  correo!: string;
  currentPassword = '';
  validPassword = false;
  
  newPassword!: string;
  confirmNewPassword!: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  verificarContrasena() {
    this.adminService.verificarContrasena(this.correo, this.currentPassword).subscribe(
      (response) => {
        // Manejar la respuesta de la verificación de la contraseña actual
      },
      (error) => {
        // Manejar el error
      }
    );
  }

  cambiarContrasena(newPassword: string, confirmNewPassword: string): void {
    if (newPassword !== confirmNewPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    // Lógica para cambiar la contraseña
    this.adminService.cambiarContrasena(newPassword).subscribe(
      () => {
        // Contraseña cambiada exitosamente
        // Redirigir a alguna otra página
      },
      (error: any) => {
        // Manejo de errores al cambiar la contraseña
        console.error('Error al cambiar la contraseña', error);
      }
    );
  }

}
