// Definimos la Estructura de nuestro registro
// Todos los campos son obligatorios 
// al menos que se declare como opcional con signo de pregunta

export class CLLocales {
    // si no Inicializo los valores, da Error
    // Por eso es el constructor por obligación
    id: Number;
    direccion: string;
    descripcion: string;
    correo: string;
    telefono: string;
   
  
    // si no Inicializo los valores, da Error
      constructor(obj: any){
          this.id = obj && obj.id || null
          this.direccion = obj && obj.direccion || null
          this.descripcion = obj && obj.descripcion || null
          this.correo = obj && obj.correo || null
          this.telefono = obj && obj.telefono || null
         
      }
  }
