import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';
  private isAuthenticated = false;
  private nombreUsuario = '';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };

    // Utilizo pipe para modificar el observable y realizar acciones adicionales
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.isAuthenticated = true;
          this.setNombreUsuario(response.nombreUsuario);
        }
      })
    );
  }

  register(userData: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, userData);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    // Realiza el cierre de sesión
    // Establece isAuthenticated en false
    this.isAuthenticated = false;
    this.clearNombreUsuario();
  }

  getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  setNombreUsuario(nombre: string): void {
    this.nombreUsuario = nombre;
  }

  clearNombreUsuario(): void {
    this.nombreUsuario = '';
  }
}
