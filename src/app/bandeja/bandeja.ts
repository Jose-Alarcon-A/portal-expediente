import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expediente } from '../../models/expediente';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-bandeja',
  imports: [FormsModule, RouterLink],
  templateUrl: './bandeja.html',
  styleUrl: './bandeja.css',
})
export class Bandeja implements OnInit{
  expedientes: Expediente[] = [];


  nuevoExpediente: Expediente = {
    id: 0,
    nombre: '',
    estado: '',
    fechaCreacion: '',
    prioridad: '',
  }
  ngOnInit() {
    const data = localStorage.getItem('expedientes');

    if(data){
      this.expedientes = JSON.parse(data)
    }else{
      this.expedientes = [
        {
          id: 1,
          nombre: 'Fiscalización',
          estado: 'Pendiente',
          fechaCreacion: '02/05/2026',
          prioridad: 'Alta'
        },
        {
          id: 2,
          nombre: 'Revisión',
          estado: 'Pendiente',
          fechaCreacion: '04/05/2026',
          prioridad: 'Media'
        },
        {
          id: 3,
          nombre: 'Canon',
          estado: 'Pendiente',
          fechaCreacion: '07/05/2026',
          prioridad: 'Baja'
        }
      ];
    }
  }

  agregarExpediente()
  {
    if(
      !this.nuevoExpediente.nombre ||
      !this.nuevoExpediente.estado ||
      !this.nuevoExpediente.fechaCreacion ||
      !this.nuevoExpediente.prioridad
    ){
      alert('Debe completar todos los datos');
      return;
    }

    const expediente: Expediente = {
      id: Date.now(),
      nombre: this.nuevoExpediente.nombre,
      estado: this.nuevoExpediente.estado,
      fechaCreacion: this.nuevoExpediente.fechaCreacion,
      prioridad: this.nuevoExpediente.prioridad
    };

    this.expedientes.push(expediente);

    this.guardarLocalStorage();

    this.limpiarFormulario();
  }

  eliminarExpediente(id: number)
  {
    if (confirm('¿Está seguro de que desea eliminar este expediente?'))
    this.expedientes = this.expedientes.filter(e => e.id !== id)
    this.guardarLocalStorage();
  }

  limpiarFormulario(){
    this.nuevoExpediente = {
      id: 0,
      nombre: '',
      estado: '',
      fechaCreacion: '',
      prioridad: ''
    }
  };

  cambiarEstado(expediente: Expediente)
  {
    if(expediente.estado === 'Pendiente'){

      expediente.estado = 'En proceso';

    }else if(expediente.estado === 'En proceso'){

      expediente.estado = 'Finalizado';

    }/*else{

      expediente.estado = 'Pendiente';
    }*/

    this.guardarLocalStorage();
  }

  guardarLocalStorage() {
    localStorage.setItem('expedientes', JSON.stringify(this.expedientes));
  }

}
