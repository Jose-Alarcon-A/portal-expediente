import { Expediente } from './../../../models/expediente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes implements OnInit {

  expedientes: Expediente[] = [];

  ngOnInit(): void {
     const data = localStorage.getItem('expedientes');

     if(data){
      this.expedientes = JSON.parse(data);
    }
  }

  totalExpedientes()
  {
     return this.expedientes.length;
  }
  totalExpedientesPendientes()
  {
     return this.expedientes.filter(e => e.estado === 'Pendiente').length;
  }
  totalExpedientesEnProceso()
  {
     return this.expedientes.filter(e => e.estado === 'En proceso').length;
  }
  totalExpedientesFinalizados()
  {
     return this.expedientes.filter(e => e.estado === 'Finalizado').length;
  }
}
