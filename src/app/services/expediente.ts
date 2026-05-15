import { Injectable } from '@angular/core';
import { Expediente } from '../../models/expediente';



@Injectable({
  providedIn: 'root',
})
export class ExpedienteService
{

  private storagekey = 'expedientes';

  obtenerExpedientes(): Expediente[]
  {
    const data = localStorage.getItem(this.storagekey);

    if (data) {
      return JSON.parse(data);
    }

    const expeditesIniciales: Expediente[] = [
    {
      id: 1,
      nombre: 'Fiscalización',
      estado: 'Pendiente',
      fechaCreacion: '02/05/2026',
      prioridad: 'Alta',
      observaciones: ['Requiere atención urgente']
    },
    {
      id: 2,
      nombre: 'Revisión',
      estado: 'Pendiente',
      fechaCreacion: '04/05/2026',
      prioridad: 'Media',
      observaciones: ['Requiere revisión detallada']
    },
    {
      id: 3,
      nombre: 'Canon',
      estado: 'Pendiente',
      fechaCreacion: '07/05/2026',
      prioridad: 'Baja',
      observaciones: ['Requiere seguimiento periódico']
    }];

    this.guardarExpedientes(expeditesIniciales);
    return expeditesIniciales;
  }
  obtenerExpedientePorId(id: number): Expediente | undefined {
    const expedientes = this.obtenerExpedientes();
    return expedientes.find(exp => exp.id === id);
  }
  agregarExpediente(expediente: Expediente): void {
    const expedientes = this.obtenerExpedientes();
    expediente.id = Date.now();
    expedientes.push(expediente);
    this.guardarExpedientes(expedientes);
  }
  eliminarExpediente(id: number): void {
    const expedientes = this.obtenerExpedientes();
    const expedientesActualizado = expedientes.filter(exp => exp.id !== id);
    this.guardarExpedientes(expedientesActualizado);
  }
  actualizarExpediente(expediente: Expediente): void {
    const expedientes = this.obtenerExpedientes();

    const expedientesActualizados: Expediente[] = expedientes.map(e => {
      if (e.id === expediente.id) {
        return expediente;
      }
      return e;
    });

    this.guardarExpedientes(expedientesActualizados);
  }
  agregarObservacion(expediente: Expediente, observacion: string): void
  {
    if(!observacion.trim()){
      return;
    }
    expediente.observaciones.push(observacion);
  }

  contarTotal(): number {
    return this.obtenerExpedientes().length;
  }
  contarPendientes(): number {
    return this.obtenerExpedientes().filter(exp => exp.estado.toLocaleLowerCase() === 'pendiente').length;
  }
  contarEnProceso(): number {
    return this.obtenerExpedientes().filter(exp => exp.estado.toLowerCase() === 'en proceso').length;
  }
  contarFinalizados(): number {
    return this.obtenerExpedientes().filter(exp => exp.estado.toLocaleLowerCase() === 'finalizado').length;
  }

  guardarExpedientes(expedientes: Expediente[]): void {
    localStorage.setItem(this.storagekey, JSON.stringify(expedientes));
  }

  obtenerExpedientesPorEstado(estado: string): Expediente[]
  {
    return this.obtenerExpedientes()
      .filter(exp => exp.estado.toLowerCase() === estado.toLowerCase()
    );
  }

}

