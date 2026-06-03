import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-kanban',
  imports: [
    CommonModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './kanban.html',
  styleUrl: './kanban.css',
})
export class Kanban implements OnInit {

  expedientes: Expediente[] = [];

  estados: string[] = [
    'Pendiente',
    'En proceso',
    'Finalizado'
  ];

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit(): void {
    this.cargarExpedientes();
  }

  cargarExpedientes(): void {
    this.expedienteService.obtenerExpedientes().subscribe(data => {
      this.expedientes = data;
    });
  }

  obtenerExpedientesPorEstado(estado: string): Expediente[] {
    return this.expedientes.filter(exp => exp.estado === estado);
  }

  avanzarEstado(expediente: Expediente): void {
    this.expedienteService.avanzarEstado(expediente).subscribe(() => {
      this.cargarExpedientes();
    });
  }
  retrocederEstado(expediente: Expediente): void {
    const obs = this.expedienteService.retrocederEstado(expediente);
    if(obs) {
      obs.subscribe(() => this.cargarExpedientes());
    }
  }
}
