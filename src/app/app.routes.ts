import { Routes } from '@angular/router';
import { Inicio  } from './pages/inicio/inicio';
import { Bandeja } from './bandeja/bandeja';
import { Acerca } from './pages/acerca/acerca';
import { Reportes } from './pages/reportes/reportes';
import { DetalleExpediente } from './pages/detalle-expediente/detalle-expediente';
import { EditarExpediente } from './pages/editar-expediente/editar-expediente';
import { EstadoExpedientes } from './pages/estado-expedientes/estado-expedientes';


export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },
  {
    path: 'bandeja',
    component: Bandeja
  },
  {
    path: 'reportes',
    component: Reportes
  },
  {
    path: 'expedientes/estado/:estado',
    component: EstadoExpedientes
  },
  {
    path: 'acerca',
    component: Acerca
  },
  {
    path: 'expedientes/:id',
    component: DetalleExpediente
  },
  {
    path: 'expedientes/editar/:id',
    component: EditarExpediente
  },
  {
    path: '**',
    redirectTo: ''
  }
];
