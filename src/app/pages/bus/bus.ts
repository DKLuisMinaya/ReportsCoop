import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Definiciones, Vehiculo, Cooperativa } from '../../services/definiciones'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bus',
  imports: [FormsModule, CommonModule],
  templateUrl: './bus.html',
  styleUrl: './bus.css'
})
export class Bus implements OnInit {

  vehiculo: Vehiculo = { matricula: '', modelo: '', nombre: '', id_cooperativa: 0 };
  cooperativas: Cooperativa[] = [];
  editando = false;
  vehiculosConNombre: any[] = [];

  constructor(
    private definicionesService: Definiciones,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarCooperativas();

    this.definicionesService.vehiculos$.subscribe(vehiculos => {
    this.asignarNombreCooperativa(vehiculos);
  });
  }

  asignarNombreCooperativa(vehiculos: Vehiculo[]) {
  this.vehiculosConNombre = vehiculos.map(v => ({
    ...v,
    nombreCooperativa: this.cooperativas.find(c => c.id === v.id_cooperativa)?.nombre || ''
  }));
}

  cargarCooperativas() {
    this.definicionesService.getCooperativas().subscribe({
      next: (res) => {
        this.cooperativas = res;

        // Si el select no se actualiza, esto lo forza
        this.cdr.detectChanges();

        this.definicionesService.vehiculos$.subscribe(vehiculos => {
          this.vehiculosConNombre = vehiculos.map(v => ({
            ...v,
            nombreCooperativa: this.cooperativas.find(c => c.id === v.id_cooperativa)?.nombre || ''
          }));
        });
      },
      error: (err) => console.error('Error al cargar cooperativas', err)
    });
  }

  guardarVehiculo() {
    if (!this.vehiculo.matricula || !this.vehiculo.id_cooperativa) return;

    const request = this.editando && this.vehiculo.id_vehiculo
      ? this.definicionesService.actualizarVehiculo(this.vehiculo.id_vehiculo!, this.vehiculo)
      : this.definicionesService.crearVehiculo(this.vehiculo);

    request.subscribe({
    next: () => {
      alert("Se ha guardado con éxito");

      this.resetForm();
      this.cargarCooperativas(); 
    },
    error: () => alert("Ocurrió un error al guardar")
  });
  }

  eliminarVehiculo(id: number) {
    this.definicionesService.eliminarVehiculo(id).subscribe();
  }

  editarVehiculo(v: Vehiculo) {
    this.vehiculo = { ...v };
    this.editando = true;
  }

  resetForm() {
    this.vehiculo = { matricula: '', modelo: '', nombre: '', id_cooperativa: 0 };
    this.editando = false;
  }
}
