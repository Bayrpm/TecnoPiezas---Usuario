import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject, tap  } from 'rxjs';

import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8000/api';
  router: any;

  constructor(private http: HttpClient) {}

  // Productos

  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/`);
  }

  getProducto(producto_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/${producto_id}/`);
  }

  crearProducto(productoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos/`, productoData);
  }

  actualizarProducto(producto_id: number, productoData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${producto_id}/`, productoData);
  }

  eliminarProducto(producto_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${producto_id}`);
  }

  // Locales

  private localUpdatedSubject: Subject<void> = new Subject<void>();

  getLocales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/locales/`);
  }

  getLocal(id_locales: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/locales/${id_locales}/`);
  }

  addLocales(localesData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/locales/`, localesData);
  }

  updateLocales(id_locales: number, localesData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/locales/${id_locales}/`, localesData);
  }

  deleteLocales(id_locales: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/locales/${id_locales}`);
  }
  notifyLocalUpdated() {
    this.localUpdatedSubject.next();
  }
  onLocalUpdated(): Observable<void> {
    return this.localUpdatedSubject.asObservable();
  }

  // Categorías y Subcategorías

  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/`);
  }

  getSubcategoriasPorCategoria(categoriaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subcategorias_por_categoria/${categoriaId}`);
  }

  login(loginData: { username: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/login/`;
    return this.http.post(url, loginData).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  // Bodega ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private bodegaUpdatedSubject: Subject<void> = new Subject<void>();

  getBodegas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bodegas/`);
  }

  getBodega(id_bodega: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/bodegas/${id_bodega}/`);
  }

  addBodega(bodegaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bodegas/`, bodegaData);
  }

  updateBodega(id_bodega: number, bodegaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/bodegas/${id_bodega}/`, bodegaData);
  }

  deleteBodega(id_bodega: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bodegas/${id_bodega}/`);
  }

  notifyBodegaUpdated() {
    this.bodegaUpdatedSubject.next();
  }

  onBodegaUpdated(): Observable<void> {
    return this.bodegaUpdatedSubject.asObservable();
  }

}


