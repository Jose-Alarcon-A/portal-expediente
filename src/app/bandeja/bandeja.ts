import { ExpedienteService } from './../services/expediente';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../models/expediente';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bandeja',
  imports: [FormsModule, RouterLink, DatePipe],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja implements OnInit{
  expedientes: Expediente[] = [];
  nuevaObservacion = '';

  filtroEstado = '';
  filtroPrioridad = '';

  nuevoExpediente: Expediente = {
    id: 0,
    nombre: '',
    estado: '',
    fechaCreacion: '',
    prioridad: '',
    observaciones: [],
    historial: []
  }

  constructor(private ExpedienteService: ExpedienteService) {}

  ngOnInit() {
    this.cargarExpedientes();
  }

  cargarExpedientes()
  {
    this.expedientes = this.ExpedienteService.obtenerExpedientes();
    this.expedientes.forEach(expediente => {
      if(!Array.isArray(expediente.observaciones)){
        expediente.observaciones = [];
      }
    });
  }

  agregarExpediente()
  {
    if(
      !this.nuevoExpediente.nombre ||
      !this.nuevoExpediente.estado ||
      !this.nuevoExpediente.fechaCreacion ||
      !this.nuevoExpediente.prioridad
    ){
      alert('Debe completar todos los datos');
      return;
    }

    const expediente: Expediente = {
      id: Date.now(),
      nombre: this.nuevoExpediente.nombre,
      estado: this.nuevoExpediente.estado,
      fechaCreacion: this.nuevoExpediente.fechaCreacion,
      prioridad: this.nuevoExpediente.prioridad,
      observaciones: this.nuevoExpediente.observaciones,
      historial: this.nuevoExpediente.historial
    };

    this.ExpedienteService.agregarExpediente(expediente);
    this.cargarExpedientes();

    this.limpiarFormulario();
  }

  agregarObservacion()
  {
    this.ExpedienteService.agregarObservacion(this.nuevoExpediente, this.nuevaObservacion);
    this.nuevaObservacion = '';
  }

  eliminarExpediente(id: number)
  {
    this.ExpedienteService.eliminarExpediente(id);
    this.cargarExpedientes();
  }

  limpiarFormulario(){
    this.nuevoExpediente = {
      id: 0,
      nombre: '',
      estado: '',
      fechaCreacion: '',
      prioridad: '',
      observaciones: [],
      historial: []
    }
  };

  cambiarEstado(expediente: Expediente)
  {
    if(expediente.estado === 'Pendiente'){

      expediente.estado = 'En proceso';

    }else if(expediente.estado === 'En proceso'){

      expediente.estado = 'Finalizado';

    }/*else{

      expediente.estado = 'Pendiente';
    }*/

    this.ExpedienteService.agregarHistorial(expediente, `El expediente "${expediente.nombre}" cambió al estado "${expediente.estado}" el ${new Date().toLocaleString()}`);

    this.ExpedienteService.guardarExpedientes(this.expedientes);
    this.cargarExpedientes();

  }
  obtenerExpedientesFiltrados()
  {
    return this.expedientes.filter(expediente => {
      const cumpleEstado = !this.filtroEstado || expediente.estado === this.filtroEstado;
      const cumplePrioridad = !this.filtroPrioridad || expediente.prioridad === this.filtroPrioridad;
      return cumpleEstado && cumplePrioridad;
    });
  }
  limpiarFiltros()
  {
    this.filtroEstado = '';
    this.filtroPrioridad = '';
  }
}
