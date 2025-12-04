import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Definiciones, Oficial, Cooperativa } from '../../services/definiciones'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oficiales',
  imports: [FormsModule, CommonModule],
  templateUrl: './oficiales.html',
  styleUrl: './oficiales.css'
})
export class Oficiales implements OnInit {

  oficial: Oficial = { nombre: '', telefono: '', id_cooperativa: 0 };
  cooperativas: Cooperativa[] = [];

  constructor(
    private oficialesService: Definiciones,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarCooperativas();
  }

  cargarCooperativas() {
    this.oficialesService.getCooperativas().subscribe({
      next: (res) => {
        this.cooperativas = res;
        this.cdr.detectChanges(); // <<< Forzar refresco del select
      },
      error: (err) => console.error('Error al cargar cooperativas', err)
    });
  }

  guardarOficial() {
    if (!this.oficial.id_cooperativa || this.oficial.id_cooperativa === 0) {
      alert('Debe seleccionar una cooperativa');
      return;
    }

    this.oficialesService.crearOficial(this.oficial).subscribe({
      next: () => {
        this.oficial = { nombre: '', telefono: '', id_cooperativa: 0 };
        alert("Guardado con exito");
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar oficial');
      }
    });
  }
}
