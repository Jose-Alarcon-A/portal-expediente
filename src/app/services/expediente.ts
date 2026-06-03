import { Injectable } from '@angular/core';
import { Expediente } from '../../models/expediente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class ExpedienteService
{
  /*dataSource = */
  private apiURL = 'http://localhost:3000/expedientes';

  constructor(private http: HttpClient) {}

  obtenerExpedientes(): Observable<Expediente[]>
  {
    return this.http.get<Expediente[]>(this.apiURL);
  }

  obtenerExpedientePorId(id: number): Observable<Expediente | undefined> {
    return this.http.get<Expediente | undefined>(`${this.apiURL}/${id}`);
  }

  agregarExpediente(expediente: Expediente): Observable<Expediente> {
    return this.http.post<Expediente>(this.apiURL, expediente);
  }

  eliminarExpediente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
  actualizarExpediente(expediente: Expediente): Observable<Expediente> {
    return this.http.put<Expediente>(`${this.apiURL}/${expediente.id}`, expediente);
  }

  agregarObservacion(expediente: Expediente, observacion: string): void
  {
    if(!observacion.trim()){
      return;
    }
    expediente.observaciones.push(observacion);
  }

  contarTotal(): Observable<number> {
    return this.obtenerExpedientes().pipe(
      map(data => data.length)
    );
  }
  contarPendientes(): Observable<number> {
    return this.obtenerExpedientes().pipe(
      map(data => data.filter(e => e.estado === 'Pendiente').length)
    );
  }

  contarEnProceso(): Observable<number> {
    return this.obtenerExpedientes().pipe(
      map(data => data.filter(exp => exp.estado.toLowerCase() === 'en proceso').length)
    );
  }
  contarFinalizados(): Observable<number> {
    return this.obtenerExpedientes().pipe(
      map(data => data.filter(exp => exp.estado.toLocaleLowerCase() === 'finalizado').length)
    );
  }

  guardarExpedientes(expedientes: Expediente): Observable<Expediente>
  {
    return this.http.post<Expediente>(this.apiURL, expedientes);
  }

  obtenerExpedientesPorEstado(estado: string): Observable<Expediente[]> {
    return this.obtenerExpedientes().pipe(
      map(data => data.filter(exp => exp.estado.toLowerCase() === estado.toLowerCase()))
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

  getProximosAVencer(): Observable<Expediente[]> {
    return this.obtenerExpedientes().pipe(
      map(data => data.filter(exp => this.estaProximoAVencer(exp.fechaVencimiento)))
    );
  }

  calcularDias(fecha: string): string {
    const hoy = new Date();
    const vence = new Date(fecha);
    const dias = Math.ceil((vence.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

    if (dias === 0) return '⚠️ Vence hoy';
    if (dias === 1) return '⚠️ Vence mañana';
    if (dias < 0) return `🚨 Venció hace ${Math.abs(dias)} días`;
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
  cambiarEstado(expediente: Expediente): Observable<Expediente> {
    if(expediente.estado === 'Pendiente') {
      expediente.estado = 'En proceso';
    } else if(expediente.estado === 'En proceso') {
      expediente.estado = 'Finalizado';
    }

    this.agregarHistorial(
      expediente,
      `El expediente "${expediente.nombre}" cambió al estado "${expediente.estado}" el ${new Date().toLocaleString()}`
    );

    return this.actualizarExpediente(expediente);
  }

  avanzarEstado(expediente: Expediente): Observable<Expediente>
  {
    const estadoAnterior = expediente.estado;

    if(expediente.estado === 'Pendiente'){
      expediente.estado = 'En proceso';
    }
    else if(expediente.estado === 'En proceso'){
      expediente.estado = 'Finalizado';
    }
    else if(expediente.estado === 'Finalizado'){
      expediente.estado = 'Pendiente';
    }

    this.agregarHistorial(
      expediente,
      `El expediente "${expediente.nombre}" cambió de "${estadoAnterior}" a "${expediente.estado}" el ${new Date().toLocaleString()}`
    );

    return this.actualizarExpediente(expediente);
  }

  retrocederEstado(expediente: Expediente): Observable<Expediente> | void
  {
    const estadoAnterior = expediente.estado;

    if(expediente.estado === 'Finalizado'){
      expediente.estado = 'En proceso';
    }
    else if(expediente.estado === 'En proceso'){
      expediente.estado = 'Pendiente';
    }
    else if(expediente.estado === 'Pendiente'){
      return;
    }

    this.agregarHistorial(
      expediente,
      `El expediente "${expediente.nombre}" volvió de "${estadoAnterior}" a "${expediente.estado}" el ${new Date().toLocaleString()}`
    );

    return this.actualizarExpediente(expediente);
  }

}

