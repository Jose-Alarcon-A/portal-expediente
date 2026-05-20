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
      fechaCreacion: '2026-05-02',
      fechaVencimiento: '2026-06-30',
      prioridad: 'Alta',
      observaciones: ['Requiere atención urgente'],
      historial:[]
    },
    {
      id: 2,
      nombre: 'Revisión',
      estado: 'Pendiente',
      fechaCreacion: '2026-05-04',
      fechaVencimiento: '2026-06-15',
      prioridad: 'Media',
      observaciones: ['Requiere revisión detallada'],
      historial:[]
    },
    {
      id: 3,
      nombre: 'Canon',
      estado: 'Pendiente',
      fechaCreacion: '2026-05-07',
      fechaVencimiento: '2026-06-20',
      prioridad: 'Baja',
      observaciones: ['Requiere seguimiento periódico'],
      historial:[]
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

  agregarHistorial(expediente: Expediente, historial: string): void
  {
    if(!historial.trim()){
      return;
    }
    expediente.historial.push(historial);
  }

  estaVencido(fecha: string): boolean
  {

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);          // ← importante: ignorar la hora
    const vencimiento = new Date(fecha);

    return vencimiento < hoy;

  }
  //Fecha Vencimiento//
  estaProximoAVencer(fecha: string): boolean {
    const hoy = new Date();
    const vencimiento = new Date(fecha);

    // Resta los milisegundos: cuánto falta desde ahora hasta el vencimiento
    // Si vencimiento > hoy → positivo (falta tiempo)
    // Si vencimiento < hoy → negativo (ya venció)
    const diferenciaMs = vencimiento.getTime() - hoy.getTime();

    // Convierte milisegundos a días
    // 1000ms = 1s → x60 = 1min → x60 = 1hora → x24 = 1día
    const dias = diferenciaMs / (1000 * 60 * 60 * 24);

    // dias >= 0 → no ha vencido todavía
    // dias <= 7 → vence dentro de 7 días
    return dias >= 0 && dias <= 7;
  }
  getEstadoVencimiento(fecha: string): 'vencido' | 'proximo' | 'vigente'
  {
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const dias = (vencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

    if (dias < 0)  return 'vencido';   // ya pasó
    if (dias <= 7) return 'proximo';   // entre hoy y 7 días
    return 'vigente';                  // más de 7 días
  }

  getProximosAVencer(): Expediente[] {
    return this.obtenerExpedientes().filter(exp =>
      this.estaProximoAVencer(exp.fechaVencimiento)
    );
  }

  calcularDias(fecha: string): string {
    const hoy = new Date();
    const vence = new Date(fecha);
    const dias = Math.ceil((vence.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

    if (dias === 0) return '⚠️ Vence hoy';
    if (dias === 1) return '⚠️ Vence mañana';
    return `${dias} días`;
  }
  obtenerDiasRestantes(fecha: string): number {
    const hoy = new Date();
    const vence = new Date(fecha);

    return Math.ceil(
      (vence.getTime() - hoy.getTime())
      / (1000 * 60 * 60 * 24)
    );
  }
}

