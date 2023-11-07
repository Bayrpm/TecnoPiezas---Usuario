import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

import { Subcategoria } from './model/ClSubcategorias';



interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>(this.carrito);
  carrito$ = this.carritoSubject.asObservable();

  private apiUrl = 'http://localhost:8000/api';

  private accountsUrl = 'http://localhost:8000/accounts';

  // Con esto podremos conectar el filtro con el HTML de ver productos
  // debemos hacer esta conexion porque o si no, no funciona, porque?
  // no tengo ni idea, segun es porque estan en componetentes separados xd - Bayron A.


  private productosFiltradosSubject = new BehaviorSubject<any[]>([]);
  productosFiltrados$ = this.productosFiltradosSubject.asObservable();

  constructor(private http: HttpClient) {
   const carritoLocal = localStorage.getItem('carrito');
    if (carritoLocal) {
      this.carrito = JSON.parse(carritoLocal);
      this.carritoSubject.next([...this.carrito]);
    }
  }

  obtenerTodosLosProductos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos/`);
  }

  obtenerProductoPorId(productoId: number): Observable<Producto | null> {
    return this.http.get<Producto>(`${this.apiUrl}/productos/${productoId}`);
  }

  getProducto(producto_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/${producto_id}/`);
  }

  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias/`);
  }

  obtenerSubcategorias(categoriaId: number): Observable<Subcategoria[]> {
    const url = `http://localhost:8000/api/subcategorias_por_categoria/${categoriaId}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        // Realiza cualquier transformación necesaria en la respuesta
        // y mapea los datos al tipo Subcategoria[]
        return response as Subcategoria[];
      }),
      catchError((error: any) => {
        console.error('Error en la solicitud HTTP:', error);
        // Puedes manejar errores aquí según tus necesidades
        throw error;
      })
    );
  }


  obtenerSubcategoriasPorCategoria(categoriaId: number): Observable<Subcategoria[]> {
    const url = `http://localhost:8000/api/subcategorias_por_categoria/${categoriaId}`;

    return this.http.get(url).pipe(
      map((response: any) => {
        // Aquí puedes realizar cualquier transformación necesaria en la respuesta
        // Por ejemplo, si la respuesta tiene un formato diferente al tipo Subcategoria[],
        // puedes mapearla y transformarla en un array de subcategorías
        return response as Subcategoria[];
      })
    );
  }

  obtenerProductosFiltrados(busqueda: string, categoria: number | '', subcategoria: number | ''): Observable<any[]> {
    // Construye la URL para la solicitud HTTP con los parámetros de búsqueda
    let url = `${this.apiUrl}/productos/filtro/?`;

    if (busqueda) {
      url += `busqueda=${busqueda}&`;
    }

    if (categoria !== '') {
      url += `categoria=${categoria}&`;
    }

    if (subcategoria !== '') {
      url += `subcategoria=${subcategoria}&`;
    }

    // Remueve el último "&" si está presente
    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    // Realiza la solicitud HTTP para obtener productos filtrados
    return this.http.get<any[]>(url);
  }

  actualizarProductosFiltrados(productos: any[]): void {
    this.productosFiltradosSubject.next(productos);
  }

  //carrito

  agregarAlCarrito(producto: Producto) {
    const productoExistente = this.carrito.find((p) => p.id === producto.id);
    if (productoExistente) {
      if (productoExistente.stock > 0) {
        productoExistente.stock--;
      }
    } else {
      producto.stock = 1;
      this.carrito.push(producto);
    }
    this.carritoSubject.next([...this.carrito]);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  obtenerCarrito(): Observable<Producto[]> {
    return this.carrito$;
  }

  vaciarCarrito() {
    this.carrito.forEach((producto) => {
      producto.stock += 1;
    });
    this.carrito = [];
    this.carritoSubject.next([]);
    localStorage.removeItem('carrito');
  }

  actualizarCarrito(carrito: Producto[]) {
    this.carrito = carrito;
    this.carritoSubject.next([...this.carrito]);
  }
  eliminarDelCarrito(producto: Producto) {
    const index = this.carrito.findIndex((p) => p.id === producto.id);
    if (index !== -1) {
      if (this.carrito[index].stock > 0) {
        this.carrito[index].stock--;
        if (this.carrito[index].stock === 0) {
          this.carrito.splice(index, 1);
        }
        this.carritoSubject.next([...this.carrito]);
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
      }
    }
  }

  // Para registrar usuarios y crear su perfil

  registrarUsuario(userData: any) {
    return this.http.post(`${this.accountsUrl}/registro/`, userData);
  }

  iniciarSesion(userData: any) {
    return this.http.post(`${this.accountsUrl}/inicio-sesion/`, userData);
  }

  // final de crear perfil y login

}
