import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-estado-expedientes',
  imports: [],
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
      this.expedientes = this.expedienteService.obtenerExpedientesPorEstado
      (
        this.estado
      );
    });
  }
}
