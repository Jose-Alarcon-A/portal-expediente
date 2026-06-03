import { ExpedienteService } from './../services/expediente';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../models/expediente';
import { RouterLink } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bandeja',
  imports: [FormsModule,
            RouterLink,
            DatePipe,
            NgClass,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatSelectModule,
            MatTableModule,
            MatIconModule,
            MatDatepickerModule,
            MatNativeDateModule
          ],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja implements OnInit{
  dataSource = new MatTableDataSource<Expediente>();
  nuevaObservacion = '';

  columnas: string[] =
  [
    'id',
    'nombre',
    'estado',
    'fechaCreacion',
    'fechaVencimiento',
    'prioridad',
    'observaciones',
    'acciones'
  ];

  filtroEstado = '';
  filtroPrioridad = '';

  nuevoExpediente: Expediente = {
    id: 0,
    nombre: '',
    estado: '',
    fechaCreacion: '',
    fechaVencimiento: '',
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
    this.ExpedienteService.obtenerExpedientes().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.data.forEach(expediente => {
        if(!Array.isArray(expediente.observaciones)){
          expediente.observaciones = [];
        }
      });
    });
  }

  agregarExpediente()
  {
    if(
      !this.nuevoExpediente.nombre ||
      !this.nuevoExpediente.estado ||
      !this.nuevoExpediente.fechaCreacion ||
      !this.nuevoExpediente.fechaVencimiento ||
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
      fechaVencimiento: this.nuevoExpediente.fechaVencimiento,
      prioridad: this.nuevoExpediente.prioridad,
      observaciones: this.nuevoExpediente.observaciones,
      historial: this.nuevoExpediente.historial
    };

    const fechaCreacion = new Date(this.nuevoExpediente.fechaCreacion);

    const fechaVencimiento = new Date(this.nuevoExpediente.fechaVencimiento);

    if(fechaVencimiento < fechaCreacion){
      alert(
        'La fecha de vencimiento no puede ser anterior a la fecha de creación'
      );
      return;
    }

    this.ExpedienteService.agregarExpediente(expediente).subscribe({
      next: (expedienteCreado) => {
        this.dataSource.data = [...this.dataSource.data, expedienteCreado];
        this.cargarExpedientes();
        this.limpiarFormulario();
      }
    });
  }

  agregarObservacion()
  {
    this.ExpedienteService.agregarObservacion(this.nuevoExpediente, this.nuevaObservacion);
    this.nuevaObservacion = '';
  }

  eliminarExpediente(id: number)
  {
    if(!confirm('¿Está seguro de eliminar este expediente?')){
      return;
    }
    this.ExpedienteService.eliminarExpediente(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(exp => exp.id !== id);
      },
      error: (err) => {
        alert('Error al eliminar el expediente');
        console.error(err);
      }
    });
  }

  limpiarFormulario(){
    this.nuevoExpediente = {
      id: 0,
      nombre: '',
      estado: '',
      fechaCreacion: '',
      fechaVencimiento: '',
      prioridad: '',
      observaciones: [],
      historial: []
    }
  };

  cambiarEstado(expediente: Expediente)
  {
    this.ExpedienteService.avanzarEstado(expediente).subscribe(() => {
      this.cargarExpedientes();
    });
  }
  obtenerExpedientesFiltrados()
  {
    return this.dataSource.data.filter(expediente => {
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
  estadoVencimiento(fecha: string)
  {
    return this.ExpedienteService.getEstadoVencimiento(fecha);
  }
}
