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
  estadoOriginal = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expedienteService: ExpedienteService
  ){}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.expedienteService.obtenerExpedientePorId(id).subscribe(exp => {
      if(exp)
      {
       if(!Array.isArray(exp.observaciones)){
          exp.observaciones = [];
        }
        this.expediente = exp;
        this.estadoOriginal = exp.estado;
      }
      else
      {
        alert('Expediente no encontrado');
      }
    });
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

    const fechaCreacion = new Date(this.expediente.fechaCreacion);
    const fechaVencimiento = new Date(this.expediente.fechaVencimiento);

    if(fechaVencimiento < fechaCreacion){
      alert(
        'La fecha de vencimiento no puede ser anterior a la fecha de creación'
      );
      return;
    }

    if(this.estadoOriginal !== this.expediente.estado){
      this.expedienteService.agregarHistorial(this.expediente, `El expediente "${this.expediente.nombre}" cambió al estado "${this.expediente.estado}" el ${new Date().toLocaleString()}`);
    }

    if(confirm('¿Está seguro de guardar los cambios?'))
    {
      this.expedienteService.actualizarExpediente(
        this.expediente
      ).subscribe(() => {
        this.router.navigate(['/bandeja']);
      });
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
