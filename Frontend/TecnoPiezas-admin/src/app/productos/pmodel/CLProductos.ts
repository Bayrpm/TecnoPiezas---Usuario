export class CLProductos {
    producto_id: number;
    nombre: string;
    precio: string;
    stock: string;
    descripcion: string;
    imagen: string;
    categoria: number;
    subcategoria: number;
    nuevoCampo: string; // Agregar el nuevo campo aquí

    constructor(obj: any) {
        this.producto_id = obj && obj.producto_id || null;
        this.nombre = obj && obj.nombre || null;
        this.precio = obj && obj.precio || null;
        this.stock = obj && obj.stock || null;
        this.descripcion = obj && obj.descripcion || null;
        this.imagen = obj && obj.imagen || null;
        this.categoria = obj && obj.categoria || null;
        this.subcategoria = obj && obj.subcategoria || null;
        this.nuevoCampo = obj && obj.nuevoCampo || null; // Inicializar el nuevo campo
    }
}