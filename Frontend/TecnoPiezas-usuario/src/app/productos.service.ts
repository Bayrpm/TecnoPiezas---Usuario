import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
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

  constructor(private http: HttpClient,private authService:AuthService, private router:Router) {
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
    if (this.authService.isLoggedIn()) {
      let added = false;

      for (let p of this.carrito) {
        if (p.producto_id === producto.producto_id) {
          p.cantidad += 1;
          added = true;
          break;
        }
      }

      if (!added) {
        this.carrito.push({ ...producto, stock: 1, cantidad: 1 });
      }

      this.actualizarCarrito();
    } else {
      // Redirigir al usuario a la página de inicio de sesión si no ha iniciado sesión
      this.router.navigate(['/inicio-sesion']);
    }
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
    this.carritoSubject.next([...this.carrito]);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  // Métodos para registrar usuarios y crear perfiles

  registrarUsuario(userData: any) {
    return this.http.post(`${this.accountsUrl}/registro/`, userData);
  }

  iniciarSesion(userData: any) {
    return this.http.post(`${this.accountsUrl}/inicio-sesion/`, userData);
  }
}
