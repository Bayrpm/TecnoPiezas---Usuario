// Definimos la Estructura de nuestro registro
// Todos los campos son obligatorios 
// al menos que se declare como opcional con signo de pregunta

export class CLCategorias {
    id_categoria: number;
    nombre_categoria: string;
  
    constructor(obj: any) {
      this.id_categoria = obj && obj.id_categoria || null
      this.nombre_categoria = obj && obj.nombre_categoria || null
    }
  }

  