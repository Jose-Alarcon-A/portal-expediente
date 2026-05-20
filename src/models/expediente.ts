export interface Expediente {
  id: number;
  nombre: string;
  estado: string;
  fechaCreacion: string;
  fechaVencimiento: string;
  prioridad: string;
  observaciones: string[];
  historial: string[];
}
