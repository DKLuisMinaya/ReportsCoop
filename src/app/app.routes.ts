import { Routes } from '@angular/router';
import { Finanzas } from './pages/finanzas/finanzas';
import {Boletos} from './pages/boletos/boletos'
import {Rubro} from './pages/rubro/rubro'
import {Choferes} from './pages/choferes/choferes'
import {Oficiales} from './pages/oficiales/oficiales'
import {Turnos} from './pages/turnos/turnos'
import {Bus} from './pages/bus/bus'
export const routes: Routes = [

    { path: '', redirectTo: 'rubro', pathMatch: 'full' }, 
  { path: 'finanzas', component: Finanzas },
  { path: 'boletos', component: Boletos },
  { path: 'rubro', component: Rubro },
  { path: 'choferes', component: Choferes },
  { path: 'oficiales', component: Oficiales },
  { path: 'turnos', component: Turnos },
  { path: 'bus', component: Bus },
  { path: '**', redirectTo: 'rubro' }
];
