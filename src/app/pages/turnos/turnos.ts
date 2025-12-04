import { Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Definiciones, Cooperativa, Turnoo} from '../../services/definiciones'

@Component({
  selector: 'app-turnos',
  imports: [FormsModule,CommonModule],
  templateUrl: './turnos.html',
  styleUrl: './turnos.css'
})
export class Turnos {
  cooperativas: Cooperativa[] = [];
  turno: Turnoo = { hora_salida: '', hora_llegada: '', id_cooperativa: 0 };

  constructor(private turnosService: Definiciones, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarCooperativas();
  }

  cargarCooperativas() {
    this.turnosService.getCooperativas().subscribe({
      next: (res) => {
        this.cooperativas = res;
        this.cdr.detectChanges(); // <<< Forzar refresco del select
      },
      error: (err) => console.error('Error al cargar cooperativas', err)
    });
  }
  guardarTurno() {
    if (!this.turno.hora_salida || !this.turno.hora_llegada || !this.turno.id_cooperativa) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.turnosService.crearTurno(this.turno)
      .subscribe({
        next: () => {
          alert('Turno guardado con éxito');
          this.turno = { hora_salida: '', hora_llegada: '', id_cooperativa: 0 };
        },
        error: (err) => {
          console.error(err);
          alert('Error al guardar turno');
        }
      });
  }
}
