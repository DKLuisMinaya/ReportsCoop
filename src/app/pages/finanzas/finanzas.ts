import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Reportes, Reporte, Cooperativa, Vehiculo } from '../../services/reportes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, CommonModule, DatePipe, TitleCasePipe],
  templateUrl: './finanzas.html',
  styleUrl: './finanzas.css'
})
export class Finanzas implements OnInit {

  cooperativas: Cooperativa[] = [];
  cooperativaSeleccionada: Cooperativa | null = null;

  vehiculos: Vehiculo[] = [];
  vehiculoSeleccionado: Vehiculo | null = null;

  reportes: Reporte[] = [];
  fechaSeleccionada: string = '';

  constructor(
    private reportesService: Reportes,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarCooperativas();
  }

  cargarCooperativas() {
    this.reportesService.getCooperativas().subscribe({
      next: (data) => {
        this.cooperativas = data;
        this.cd.detectChanges();  
      },
      error: (err) => console.error(err)
    });
  }

  cargarVehiculos() {
    if (!this.cooperativaSeleccionada) return;

    this.reportesService
      .getVehiculos(this.cooperativaSeleccionada.id)
      .subscribe({
        next: (data) => {
          this.vehiculos = data;
          this.cd.detectChanges();  
        },
        error: (err) => console.error(err)
      });
  }

  cargarReportes() {
    if (!this.vehiculoSeleccionado || !this.fechaSeleccionada) return;

    this.reportesService
      .getReportes(this.vehiculoSeleccionado.id_vehiculo, this.fechaSeleccionada)
      .subscribe({
        next: (data) => {
          this.reportes = data.map(r => ({
            ...r,
            turno: {
              id_turno: r.turno.id_turno,
              hora_salida: r.turno.hora_salida ?? '-',
              hora_llegada: r.turno.hora_llegada ?? '-'
            }
          }));

          this.cd.detectChanges(); // ← Garantiza render inmediato
        },
        error: (err) => console.error(err)
      });
  }
}
