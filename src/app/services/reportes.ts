import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Observable } from 'rxjs';
import {AppConfig} from '../config/app-config'


export interface Cooperativa { id: number; nombre: string; }
export interface Vehiculo { id_vehiculo: number; matricula: string; modelo: string; nombre: string; }
export interface Reporte {
  id_rubro: number;
  fecha: string;
  turno: {id_turno: string;  hora_salida: string; hora_llegada: string };
  chofer: string;
  oficial: string;
  anticipotBoleteria: number;
  creditoCombustible: number;
  observaciones: string;
  vueltas: (number | null)[];
  gastos: Gastos;
  ingresos_totales: number;
  gastos_totales: number;
  balance: number;
}

export interface Gastos {
  sello: number;
  despachador: number;
  hoja: number;
  agua: number;
  almuerzo: number;
  otros: number;
  guardia: number;
  sello_portoviejo:number;
  fenacotip: number;
  diesel_1:number;
  diesel_2:number;
  diesel_3:number;
  chofer: number;
}



@Injectable({
   providedIn: 'root'
})
export class Reportes {
  private apiUrl = AppConfig.apiUrl;

  constructor(private http: HttpClient) {}

  getCooperativas(): Observable<Cooperativa[]> {
    return this.http.get<Cooperativa[]>(`${this.apiUrl}/cooperativas`);
  }

  getVehiculos(cooperativaId: number): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/vehiculos/${cooperativaId}`);
  }

  getReportes(vehiculoId: number, fecha: string): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.apiUrl}/reportes/${vehiculoId}/${fecha}`);
  }
}




