import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-expediente',
  imports: [DatePipe, RouterLink],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {

  idExpediente = 0;

  expediente: Expediente | undefined;

  constructor(
    private route: ActivatedRoute,
    private expedienteService: ExpedienteService
  ) {}

  ngOnInit(): void {

    this.idExpediente = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.expedienteService.obtenerExpedientePorId(
      this.idExpediente
    ).subscribe(exp => {
      this.expediente = exp;
    });
  }

  obtenerClasePrioridad(prioridad: string){

    if (prioridad === 'Alta'){
      return 'Prioridad-alta';
    }

    if (prioridad === 'Media'){
      return 'Prioridad-media';
    }

    return 'Prioridad-baja';
  }

  obtenerClaseEstado(estado: string){

    if (estado === 'Pendiente'){
      return 'estado-Pendiente';
    }

    if (estado === 'En proceso'){
      return 'estado-proceso';
    }

    return 'estado-finalizado';
  }
}
