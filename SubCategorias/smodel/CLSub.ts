// Definimos la Estructura de nuestro registro
// Todos los campos son obligatorios 
// al menos que se declare como opcional con signo de pregunta

export class CLSub{
    subcategoria_id: number;
    nombre_subcategoria: string;
    categoria: number; 
  
    constructor(obj: any) {
      this.subcategoria_id = obj && obj.subcategoria_id || null
      this.nombre_subcategoria = obj && obj.nombre_subcategoria || null
      this.categoria = obj && obj.categoria || null
    }
  }

  