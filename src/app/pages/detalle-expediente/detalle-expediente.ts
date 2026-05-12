import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-detalle-expediente',
  imports: [],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {
  idExpediente = 0;
  expediente: Expediente | undefined;

  constructor(private route: ActivatedRoute)
  {

  }

  ngOnInit(): void {
    this.idExpediente = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const data = localStorage.getItem('expedientes');

    if(data){
      const expedientes: Expediente[] = JSON.parse(data);

      this.expediente = expedientes.find(e => e.id === this.idExpediente);
    }

  }

  obtenerClasePrioridad(prioridad: String){
    if (prioridad === 'Alta'){
      return 'Prioridad-alta';
    }
    if (prioridad === 'Media'){
      return 'Prioridad-media';
    }
    return 'Prioridad-baja';
  }

  obtenerClaseEstado(estado: String){
    if (estado === 'Pendiente'){
      return 'estado-Pendiente';
    }
    if (estado === 'En proceso'){
      return 'estado-proceso';
    }
    return 'estado-finalizado';
  }
}
