import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Expediente } from '../../../models/expediente';

@Component({
  selector: 'app-editar-expediente',
  imports: [FormsModule],
  templateUrl: './editar-expediente.html',
  styleUrl: './editar-expediente.css',
})
export class EditarExpediente implements OnInit {

  expediente!: Expediente;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const data = localStorage.getItem('expedientes');

    if(data){

      const expedientes: Expediente[] = JSON.parse(data);

      const encontrado = expedientes.find(
        e => e.id === id
      );

      if(encontrado){
        this.expediente = encontrado;
      }

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

    if(confirm('¿Está seguro de guardar los cambios?')){

      const data = localStorage.getItem('expedientes');

      if(data){

        const expedientes: Expediente[] = JSON.parse(data);

        const index = expedientes.findIndex(
          e => e.id === this.expediente.id
        );

        expedientes[index] = this.expediente;

        localStorage.setItem(
          'expedientes',
          JSON.stringify(expedientes)
        );

        this.router.navigate(['/bandeja']);
      }

    }

  }

}
