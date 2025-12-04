import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppConfig} from '../config/app-config'

export interface Cooperativa { id: number; nombre: string; }
export interface Vehiculo { id_vehiculo: number; nombre: string; }
export interface Ciudad { id_ciudad: number; nombre: string; }
export interface TipoBoleto { id_tipo_boleto: number; precio: number; nombre: string; }
export interface BoletoFila { id_tipo_boleto: number; nombre: string; valor: number; cantidades: number[]; }

@Injectable({ providedIn: 'root' })
export class BoletosS {
  private url = AppConfig.apiUrl;

  constructor(private http: HttpClient) {}

  getCooperativas(): Observable<Cooperativa[]> {
    return this.http.get<Cooperativa[]>(`${this.url}/cooperativas`);
  }

  getVehiculos(id_cooperativa: number): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.url}/vehiculos/${id_cooperativa}`);
  }

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.url}/ciudades`);
  }

  getTiposBoletoPorCiudad(id_ciudad: number): Observable<TipoBoleto[]> {
    return this.http.get<TipoBoleto[]>(`${this.url}/tipos-boleto-ciudad/${id_ciudad}`);
  }

  getBoletosSemana(id_vehiculo: number, id_ciudad: number, fecha: string) {
  return this.http.get<{
    boletos: any[],
    totalesDiarios: { [key: string]: number },
    totalGeneral: number
  }>(`${this.url}/boletos/semana/${id_vehiculo}/${id_ciudad}?fecha=${fecha}`);
}


  guardarBoletos(id_vehiculo: number, id_ciudad: number, tablaBoletos: BoletoFila[], dias: string[]) {
    return this.http.post(`${this.url}/boletos/semana`, {
      id_vehiculo,
      id_ciudad,
      boletos: tablaBoletos.map(fila => ({ id_tipo_boleto: fila.id_tipo_boleto, cantidades: fila.cantidades })),
      dias
    });
  }
}
