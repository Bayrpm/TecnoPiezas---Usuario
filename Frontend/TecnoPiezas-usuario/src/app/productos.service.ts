import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>(this.carrito);
  carrito$ = this.carritoSubject.asObservable();

  private producto: Producto[] = []
  private detalleSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public detalle$: Observable<any> = this.detalleSubject.asObservable();


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


  getDetallesProducto(id: number): void {
    this.http.get(`${this.apiUrlProductos}/${id}`).subscribe(
      (producto) => {
        this.detalleSubject.next(producto);
      },
      (error) => {
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

  agregarAlCarrito(producto: Producto): void {
    // Verificar si el usuario ha iniciado sesión
    if (this.isLoggedIn()) {
      const userId = this.getUserId();

      // Obtener el carrito actual del usuario desde el almacenamiento local
      const carrito = JSON.parse(localStorage.getItem(`carrito_${userId}`) || '[]');

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

      // Guardar el carrito actualizado en el almacenamiento local
      localStorage.setItem(`carrito_${userId}`, JSON.stringify(carrito));

      // Actualizar el carrito en el servicio
      this.carrito = carrito;
      this.carritoSubject.next([...this.carrito]);

      // Realizar otras acciones después de actualizar el carrito si es necesario
      this.actualizarCarrito();
    } else {
      // Redirigir al usuario a la página de inicio de sesión si no ha iniciado sesión
      this.router.navigate(['/inicio-sesion']);
    }
  }

  private isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  private getUserId(): any {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token Base64
        return userData.userId; // Ajusta esto según la estructura del payload de tu token
      } catch (error) {
        console.error('Error al obtener el ID de usuario desde el token:', error);
      }
    }

    return null;
  }

  disminuirCantidad(producto: Producto): void {
    for (const [index, item] of this.carrito.entries()) {
      if (item.producto_id === producto.producto_id) {
        item.cantidad -= 1;

        if (item.cantidad === 0) {
          this.carrito.splice(index, 1);
        }
      }
    }

    this.actualizarCarrito();
  }

  eliminarDelCarrito(productoId: number): void {
    this.carrito = this.carrito.filter((producto) => producto.producto_id == productoId);
    this.actualizarCarrito();
  }

  vaciarCarrito(): void {
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
    this.carrito.forEach((producto) => {
      producto.stock -= producto.stock;
      producto.cantidad = 0;
    });

    this.vaciarCarrito();
  }

  private actualizarCarrito(): void {
    const userId = this.getUserId();
    const carrito = JSON.parse(localStorage.getItem(`carrito_${userId}`) || '[]');

    this.carritoSubject.next([...carrito]);
    localStorage.setItem(`carrito_${userId}`, JSON.stringify(carrito));
  }

  // Métodos para registrar usuarios y crear perfiles

  registrarUsuario(userData: any) {
    return this.http.post(`${this.accountsUrl}/registro/`, userData);
  }

  iniciarSesion(userData: any) {
    return this.http.post(`${this.accountsUrl}/inicio-sesion/`, userData);
  }
}
