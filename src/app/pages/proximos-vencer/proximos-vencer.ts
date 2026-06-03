import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ExpedienteService } from '../../services/expediente';
import { Expediente } from '../../../models/expediente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proximos-vencer',
  imports: [DatePipe, CommonModule],
  templateUrl: './proximos-vencer.html',
  styleUrl: './proximos-vencer.css'
})
export class ProximosVencer implements OnInit {

  expedientes: Expediente[] = [];

  constructor(private expedienteService: ExpedienteService) {}

  ngOnInit() {
    this.expedienteService.getProximosAVencer().subscribe(data => {
      this.expedientes = data;
    });
  }

  estadoVencimiento(fecha: string) {
    return this.expedienteService.getEstadoVencimiento(fecha);
  }

  calcularDias(fecha: string): string {
    return this.expedienteService.calcularDias(fecha);
  }
  obtenerDiasRestantes(fecha: string): number {
    return this.expedienteService.obtenerDiasRestantes(fecha);
  }
}
