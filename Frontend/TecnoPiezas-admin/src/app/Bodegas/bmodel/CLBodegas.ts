// Definimos la Estructura de nuestro registro
// Todos los campos son obligatorios 
// al menos que se declare como opcional con signo de pregunta

export class CLBodegas {
    id_bodega: number;
    direccion: string;
    capacidad: number; 
  
    constructor(obj: any) {
      this.id_bodega = obj && obj.id_bodega || null
      this.direccion = obj && obj.direccion || null
      this.capacidad = obj && obj.capacidad || null
    }
  }

  