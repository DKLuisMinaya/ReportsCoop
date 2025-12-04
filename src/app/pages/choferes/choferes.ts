import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Definiciones, Chofer, Cooperativa } from '../../services/definiciones'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choferes',
  imports: [FormsModule, CommonModule],
  templateUrl: './choferes.html',
  styleUrl: './choferes.css'
})
export class Choferes implements OnInit {

  chofer: Chofer = { nombre: '', telefono: '', id_cooperativa: 0 };
  cooperativas: Cooperativa[] = [];

  constructor(
    private choferesService: Definiciones,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarCooperativas();
  }

  cargarCooperativas() {
    this.choferesService.getCooperativas().subscribe({
      next: (res) => {
        this.cooperativas = res;

  
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar cooperativas', err)
    });
  }

  guardarChofer() {
    if (!this.chofer.id_cooperativa || this.chofer.id_cooperativa === 0) {
      alert('Debe seleccionar una cooperativa');
      return;
    }

    this.choferesService.crearChofer(this.chofer).subscribe({
      next: () => {
        this.chofer = { nombre: '', telefono: '', id_cooperativa: 0 };
        alert("Se ha guardado con éxito");
    
        this.cdr.detectChanges();
      },
      error: (err) => {
        alert("No se ha podido guardar el chofer");
        console.error('Error al crear chofer:', err);
      }
    });
  }
}
