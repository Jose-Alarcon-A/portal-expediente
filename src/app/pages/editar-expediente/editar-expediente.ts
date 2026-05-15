import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expediente } from '../../../models/expediente';
import { ExpedienteService } from '../../services/expediente';

@Component({
  selector: 'app-editar-expediente',
  imports: [FormsModule],
  templateUrl: './editar-expediente.html',
  styleUrl: './editar-expediente.css',
})
export class EditarExpediente implements OnInit {

  expediente!: Expediente;
  nuevaObservacion = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expedienteService: ExpedienteService
  ){}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    const expedienteEncontrado = this.expedienteService.obtenerExpedientePorId(id);

    if(expedienteEncontrado)
    {
     if(!Array.isArray(expedienteEncontrado.observaciones)){
        expedienteEncontrado.observaciones = [];
      }
      this.expediente = expedienteEncontrado;
    }
    else
    {
      //this.mensajeError = 'Expediente no encontrado';
      alert('Expediente no encontrado');
      //this.router.navigate(['/bandeja']);
    }
  }

  guardarCambios()
  {

    if(
      !this.expediente.nombre ||
      !this.expediente.estado ||
      !this.expediente.fechaCreacion ||
      !this.expediente.prioridad
    ){
      alert('Debe completar todos los campos');
      return;
    }
    if(confirm('¿Está seguro de guardar los cambios?'))
    {
      this.expedienteService.actualizarExpediente(
        this.expediente
      );
      this.router.navigate(['/bandeja']);
    }
  }
  agregarObservacion()
  {
    this.expedienteService.agregarObservacion(
      this.expediente,
      this.nuevaObservacion
    );

    this.nuevaObservacion = '';
  }
  eliminarObservacion(index: number)
  {
    this.expediente.observaciones.splice(index, 1);
  }
}
