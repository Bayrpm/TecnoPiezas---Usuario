export interface Producto {
  producto_id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  cantidad: number;
}

export interface Comentario {
  usuario: string;
  texto: string;
  fecha: Date;
}
