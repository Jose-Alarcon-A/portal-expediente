import { ExpedienteService } from './../services/expediente';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../models/expediente';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bandeja',
  imports: [FormsModule, RouterLink],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja implements OnInit{
  expedientes: Expediente[] = [];

  nuevoExpediente: Expediente = {
    id: 0,
    nombre: '',
    estado: '',
    fechaCreacion: '',
    prioridad: '',
  }

  constructor(private ExpedienteService: ExpedienteService) {}

  ngOnInit() {
    this.cargarExpedientes();
  }

  cargarExpedientes() {
    this.expedientes = this.ExpedienteService.obtenerExpedientes();
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
      prioridad: this.nuevoExpediente.prioridad
    };

    this.ExpedienteService.agregarExpediente(expediente);
    this.cargarExpedientes();

    this.limpiarFormulario();
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
      prioridad: ''
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

    this.ExpedienteService.guardarExpedientes(this.expedientes);
    this.cargarExpedientes();
  }

}
