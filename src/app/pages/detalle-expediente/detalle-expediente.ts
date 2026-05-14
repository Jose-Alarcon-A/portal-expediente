import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-detalle-expediente',
  imports: [],
  templateUrl: './detalle-expediente.html',
  styleUrl: './detalle-expediente.css',
})
export class DetalleExpediente implements OnInit {
  idExpediente = 0;
  expediente: Expediente | undefined;

  constructor(private route: ActivatedRoute, private expedienteService: ExpedienteService) {}

  ngOnInit(): void {
    this.idExpediente = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.expediente = this.expedienteService.obtenerExpedientePorId(this.idExpediente);

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
