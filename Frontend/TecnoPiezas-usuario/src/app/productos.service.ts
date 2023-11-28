import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subcategoria } from './model/ClSubcategorias';

interface Producto {
  producto_id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private producto: Producto[] = []
  private detalleSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public detalle$: Observable<any> = this.detalleSubject.asObservable();


  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>(this.carrito);
  carrito$ = this.carritoSubject.asObservable();

  private apiUrl = 'http://localhost:8000/api';
  private apiUrlProductos = 'http://localhost:8000/api/productos';
  private accountsUrl = 'http://localhost:8000/accounts';

  private productosFiltradosSubject = new BehaviorSubject<any[]>([]);
  productosFiltrados$ = this.productosFiltradosSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const carritoLocal = localStorage.getItem('carrito');
    if (carritoLocal) {
      this.carrito = JSON.parse(carritoLocal);
      this.carritoSubject.next([...this.carrito]);
    }
  }


  getDetallesProducto(producto_id: number): void {
    this.http.get(`${this.apiUrlProductos}/${producto_id}`).subscribe(
      (producto: any) => {
        this.detalleSubject.next(producto);
      },
      (error: any) => {
        console.error('Error al obtener detalles del producto', error);
      }
    );
  }

  obtenerTodosLosProductos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos/`);
  }

  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias/`);
  }

  obtenerSubcategorias(categoriaId: number): Observable<Subcategoria[]> {
    const url = `${this.apiUrl}/subcategorias_por_categoria/${categoriaId}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response as Subcategoria[];
      }),
      catchError((error: any) => {
        console.error('Error en la solicitud HTTP:', error);
        throw error;
      })
    );
  }

  obtenerSubcategoriasPorCategoria(categoriaId: number): Observable<Subcategoria[]> {
    const url = `${this.apiUrl}/subcategorias_por_categoria/${categoriaId}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response as Subcategoria[];
      })
    );
  }

  obtenerProductosFiltrados(busqueda: string, categoria: number | '', subcategoria: number | ''): Observable<any[]> {
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

    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }

    return this.http.get<any[]>(url);
  }

  actualizarProductosFiltrados(productos: any[]): void {
    this.productosFiltradosSubject.next(productos);
  }

  // Métodos para el carrito

  private isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  agregarAlCarrito(producto: Producto): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/inicio-sesion']);
      return; // Return early if not logged in
    }

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

    let added = false;

    for (let p of carrito) {
      if (p.producto_id === producto.producto_id) {
        p.cantidad += 1;
        added = true;
        break;
      }
    }

    if (!added) {
      carrito.push({ ...producto, stock: 1, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.carrito = carrito;
    this.carritoSubject.next([...this.carrito]);
    this.actualizarCarrito();
  }



  disminuirCantidad(producto: Producto): void {
    const index = this.carrito.findIndex((item: { producto_id: number; }) => item.producto_id === producto.producto_id);

    if (index !== -1) {
      this.carrito[index].cantidad -= 1;

      if (this.carrito[index].cantidad === 0) {
        this.carrito.splice(index, 1);
      }

      this.actualizarCarrito(); // Agrega esta línea
    } else {
      console.error('Producto no encontrado en el carrito:', producto);
    }
  }



  eliminarDelCarrito(productoId: number): void {
    this.carrito = this.carrito.filter((producto) => producto.producto_id == productoId);
    this.actualizarCarrito();
  }

  vaciarCarrito(): void {
    localStorage.removeItem('carrito');
    this.carrito = [];
    this.actualizarCarrito();
  }


  obtenerCarrito(): Observable<Producto[]> {
    return this.carritoSubject.asObservable();
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio * producto.stock, 0);
  }
  finalizarCompra(): void {
    
    this.router.navigate(['/checkout']);

  }


  private actualizarCarrito(): void {
    this.carritoSubject.next([...this.carrito]);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  getLocales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/locales/`);
  }

// productos.service.ts

private getCsrfToken(): string {
  const cookieValue = document.cookie.match('(^|;)\\s*' + 'csrftoken' + '\\s*=\\s*([^;]+)')?.pop() || '';
  return cookieValue;
}

crearGuiaDespacho(id_locales: number, carrito: any[]): Observable<any> {
  const csrfToken = this.getCsrfToken();
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken,
  });

  return this.http.post(`${this.apiUrl}/crear-guia-despacho`, { id_locales, carrito }, { headers, withCredentials: true })
    .pipe(
      catchError((error) => {
        console.error('Error in crearGuiaDespacho:', error);
        throw error; // Asegúrate de lanzar el error nuevamente para que pueda ser manejado en el componente que llama a esta función
      })
    );
}



  // Métodos para registrar usuarios y crear perfiles

  registrarUsuario(userData: any) {
    return this.http.post(`${this.accountsUrl}/registro/`, userData);
  }

  iniciarSesion(userData: any) {
    return this.http.post(`${this.accountsUrl}/inicio-sesion/`, userData);
  }
}
