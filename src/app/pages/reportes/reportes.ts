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
    this.totalExpedientes = this.expedienteService.contarTotal();
    this.totalPendientes = this.expedienteService.contarPendientes();
    this.totalEnProceso = this.expedienteService.contarEnProceso();
    this.totalFinalizados = this.expedienteService.contarFinalizados();

  }

}
