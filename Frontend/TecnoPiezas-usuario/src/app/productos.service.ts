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



  private apiUrl = 'http://localhost:8000/api';

  // Con esto podremos conectar el filtro con el HTML de ver productos
  // debemos hacer esta conexion porque o si no, no funciona, porque?
  // no tengo ni idea, segun es porque estan en componetentes separados xd - Bayron A.


  private productosFiltradosSubject = new BehaviorSubject<any[]>([]);
  productosFiltrados$ = this.productosFiltradosSubject.asObservable();
  
  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>([]);
  carrito$: Observable<Producto[]> = this.carritoSubject.asObservable();


  constructor(private http: HttpClient) {
    const carritoStorage = localStorage.getItem('carrito');
    if (carritoStorage) {
      this.carrito = JSON.parse(carritoStorage);
      this.carritoSubject.next([...this.carrito]);
    }
  }

  obtenerTodosLosProductos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos/`);
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

  //carrito}
  addToCarrito(producto: Producto) {
    const productoEnCarrito = this.carrito.find((p) => p.id === producto.id);

    if (productoEnCarrito) {
      // Si el producto ya está en el carrito, simplemente incrementa la cantidad
      productoEnCarrito.stock++;
    } else {
      // Si el producto no está en el carrito, agrégalo al carrito como una nueva instancia
      const nuevoProducto = { ...producto, stock: 1 };
      this.carrito.push(nuevoProducto);
    }

    // Emitir una nueva copia del carrito con los cambios
    this.carritoSubject.next([...this.carrito]);

    // Guardar el carrito actualizado en localStorage
    this.updateLocalStorage();
  }

  decreaseCartItem(producto: Producto) {
    const existingProduct = this.carrito.find((p) => p.id === producto.id);

    if (existingProduct) {
      if (existingProduct.stock > 1) {
        existingProduct.stock -= 1;
      } else {
        // Si la cantidad es 1, elimina el producto del carrito
        this.removeCartItem(producto);
      }

      // Emitir una nueva copia del carrito con los cambios
      this.carritoSubject.next([...this.carrito]);

      // Guardar el carrito actualizado en localStorage
      this.updateLocalStorage();
    }
  }

  removeCartItem(producto: Producto) {
    const index = this.carrito.findIndex((p) => p.id === producto.id);

    if (index !== -1) {
      this.carrito.splice(index, 1);

      // Emitir una nueva copia del carrito con los cambios
      this.carritoSubject.next([...this.carrito]);

      // Actualizar el carrito en localStorage después de la eliminación
      this.updateLocalStorage();
    }
  }

  clearCart() {
    this.carrito = [];

    // Emitir una nueva copia del carrito vacío
    this.carritoSubject.next([]);

    // Limpiar el carrito en localStorage
    localStorage.removeItem('carrito');
  }

  getCarrito() {
    return this.carrito;
  }

  getCarritoItemCount() {
    return this.carrito.reduce((total, producto) => total + producto.stock, 0);
  }

  // Método para actualizar el carrito en localStorage
   updateLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
  

}