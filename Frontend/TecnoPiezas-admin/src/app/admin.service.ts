import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,Subject, catchError, map, tap, throwError  } from 'rxjs';

import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8000/api';
  private accountsUrl = 'http://localhost:8000/accounts';
  router: any;
  private headers: HttpHeaders;
  private estaLogeadoSubject = new BehaviorSubject<boolean>(false);
  estaLogeado$ = this.estaLogeadoSubject.asObservable();

  getApiUrl(): string {
    return this.apiUrl;
  }

  //get estaLogeado(): boolean {
    //return this.estaLogeadoSubject.value;
  //}

  setLogeado(estado: boolean): void {
    this.estaLogeadoSubject.next(estado);
  }

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  // Producto



  private ProductoUpdatedSubject: Subject<void> = new Subject<void>();

  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/`);
  }

  getProducto(producto_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/${producto_id}/`);
  }

  addProductos(productosData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos/`, productosData);
  }

  updateProductos(producto_id: number, productosData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${producto_id}/`, productosData);
  }

  deleteProductos(producto_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${producto_id}`);
  }
  notifyProductoUpdated() {
    this.ProductoUpdatedSubject.next();
  }
  onProductoUpdated(): Observable<void> {
    return this.ProductoUpdatedSubject.asObservable();
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

  // Categorías ================================================================================================

  private categoriaUpdatedSubject: Subject<void> = new Subject<void>();

  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/`);
  }

  getCategoria(id_categoria: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/${id_categoria}/`);
  }

  addCategoria(categoriaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categorias/`, categoriaData);
  }

  updateCategoria(id_categoria: number, categoriaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/categorias/${id_categoria}/`, categoriaData);
  }

  deleteCategoria(id_categoria: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categorias/${id_categoria}`);
  }

  notifyCategoriaUpdated() {
    this.categoriaUpdatedSubject.next();
  }

  onCategoriaUpdated(): Observable<void> {
    return this.categoriaUpdatedSubject.asObservable();
  }

  // Sub--------------Categorías ================================================================================================

  private subcategoriaUpdatedSubject: Subject<void> = new Subject<void>();

  getSubs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sub-categorias/`);
  }

  getSub(subcategoria_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/sub-categorias/${subcategoria_id}/`);
  }

  addSub(subcategoriaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sub-categorias/`, subcategoriaData);
  }

  updateSub(subcategoria_id: number, subcategoriaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/sub-categorias/${subcategoria_id}/`, subcategoriaData);
  }

  deleteSub(subcategoria_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sub-categorias/${subcategoria_id}`);
  }

  notifySubUpdated() {
    this.subcategoriaUpdatedSubject.next();
  }

  onSubUpdated(): Observable<void> {
    return this.subcategoriaUpdatedSubject.asObservable();
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

  iniciarSesionPrivado(userData: any) {
    return this.http.post(`${this.accountsUrl}/inicio-sesion-privado/`, userData)
      .pipe(
        tap(() => {
          this.setLogeado(true);
        })
      );
  }

  CerrarSesion(): Observable<any> {
    const url = `${this.accountsUrl}/cerrar-sesion/`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    };

    return this.http.post<any>(url, {}, headers)
      .pipe(
        tap(() => {
          this.setLogeado(false);
        })
      );
  }

  agregarAdmin(nombre: string, apellido: string): Observable<any> {
    const data = { nombre, apellido };

    return this.http.post(`${this.accountsUrl}/agregar-admin/`, data, {
      headers: this.headers,
    });
  }

  verificarContrasena(correo: string, currentPassword: string) {
    return this.http.post(`${this.accountsUrl}/verificar-contrasena/`, { correo, current_password: currentPassword }, { headers: this.headers });
  }

  cambiarContrasena(newPassword: string) {
    return this.http.post(`${this.accountsUrl}/cambiar-contrasena/`, { new_password: newPassword }, { headers: this.headers });
  }

}

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor(private http: HttpClient, private adminService: AdminService) {}

  uploadImage(file: File, producto_id: number): Observable<any> {
    const apiUrl = this.adminService.getApiUrl(); // Usa el método público
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${apiUrl}/productos/upload-image/${producto_id}/`, formData);
  }
}

