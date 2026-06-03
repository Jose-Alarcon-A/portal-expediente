import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-estado-expedientes',
  imports: [DatePipe],
  templateUrl: './estado-expedientes.html',
  styleUrl: './estado-expedientes.css',
})
export class EstadoExpedientes implements OnInit {
  expedientes: Expediente[] = [];
  estado: string = '';

  constructor(
    private route: ActivatedRoute,
    private expedienteService: ExpedienteService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const estadoUrl = params.get('estado') || '';

      if(estadoUrl === 'pendiente'){
        this.estado = 'Pendiente';
      }
      else if(estadoUrl === 'en-proceso'){
        this.estado = 'En proceso';
      }
      else if(estadoUrl === 'finalizado'){
        this.estado = 'Finalizado';
      }
      this.expedienteService.obtenerExpedientesPorEstado(
        this.estado
      ).subscribe(data => {
        this.expedientes = data;
      });
    });
  }
}
