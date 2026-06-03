import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {

  totalExpedientes = 0;
  totalPendientes = 0;
  totalEnProceso = 0;
  totalFinalizados = 0;

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit(): void {
    this.expedienteService.contarTotal().subscribe(n => this.totalExpedientes = n);
    this.expedienteService.contarPendientes().subscribe(n => this.totalPendientes = n);
    this.expedienteService.contarEnProceso().subscribe(n => this.totalEnProceso = n);
    this.expedienteService.contarFinalizados().subscribe(n => this.totalFinalizados = n);

  }

}
