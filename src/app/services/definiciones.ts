import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AppConfig} from '../config/app-config'

export interface Oficial {
  id?: number;
  nombre: string;
  telefono: string;
  id_cooperativa: number;
}

export interface Chofer {
  id?: number;
  nombre: string;
  telefono: string;
  id_cooperativa: number;
}

export interface Cooperativa {
  id: number;
  nombre: string;
}

export interface Turnoo {
  hora_salida: string;
  hora_llegada: string;
  id_cooperativa: number;
}

export interface Vehiculo {
  id_vehiculo?: number;
  matricula: string;
  modelo: string;
  nombre: string;
  id_cooperativa: number;
}

@Injectable({
  providedIn: 'root'
})
export class Definiciones {

  private readonly apiUrl = AppConfig.apiUrl;

  
  constructor(private http: HttpClient) {

    this.cargarVehiculos();

  }

  private cargarVehiculos() {
    this.http.get<Vehiculo[]>(`${this.apiUrl}/vehiculos`).subscribe(v => this.vehiculosSubject.next(v));
  }

  private vehiculosSubject = new BehaviorSubject<Vehiculo[]>([]);
  vehiculos$ = this.vehiculosSubject.asObservable();

  crearOficial(oficial: Oficial): Observable<Oficial> {
    return this.http.post<Oficial>(`${this.apiUrl}/oficiales`, oficial);
  }

  crearChofer(chofer: Chofer): Observable<Chofer> {
    return this.http.post<Chofer>(`${this.apiUrl}/choferes`, chofer);
  }

  getCooperativas(): Observable<Cooperativa[]> {
    return this.http.get<Cooperativa[]>(`${this.apiUrl}/cooperativas`);
  }

  crearTurno(turno: Turnoo): Observable<Turnoo> {
    return this.http.post<Turnoo>(`${this.apiUrl}/turnos`, turno);
  }

  crearVehiculo(v: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(`${this.apiUrl}/vehiculos`, v).pipe(tap(() => this.cargarVehiculos())
    );
  }

  actualizarVehiculo(id: number, v: Vehiculo): Observable<any> {
    return this.http.put(`${this.apiUrl}/vehiculos/${id}`, v).pipe(tap(() => this.cargarVehiculos()));
  }

  eliminarVehiculo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vehiculos/${id}`).pipe(tap(() => this.cargarVehiculos()));
  }
}
