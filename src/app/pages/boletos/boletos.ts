import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoletosS, TipoBoleto, Cooperativa, Vehiculo, Ciudad, BoletoFila } from '../../services/boletos';

@Component({
  selector: 'app-boletos',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './boletos.html',
  styleUrls: ['./boletos.css']
})
export class Boletos implements OnInit {

  cooperativas: Cooperativa[] = [];
  vehiculos: Vehiculo[] = [];
  ciudades: Ciudad[] = [];
  dias: string[] = [];
  tablaBoletos: BoletoFila[] = [];

  cooperativaSeleccionada!: number;
  vehiculoSeleccionado!: Vehiculo | null;
  ciudadSeleccionada!: Ciudad | null;
  fechaConsulta!: string;

  registros: any[] = [];
  diasRegistros: string[] = [];
  totalesDiarios: any = {};
  totalGeneral: number = 0;
  registrosTotalesBoletos: number = 0;

  constructor(private boletosService: BoletosS, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarCooperativas();
    this.boletosService.getCiudades().subscribe(data => this.ciudades = data);
  }

  cargarCooperativas() {
    this.boletosService.getCooperativas().subscribe({
      next: (res) => {
        this.cooperativas = res;

  
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar cooperativas', err)
    });
  }

  cargarVehiculos() {
    if (!this.cooperativaSeleccionada) return;
    this.boletosService.getVehiculos(this.cooperativaSeleccionada).subscribe(data => {
      this.vehiculos = data;
      this.vehiculoSeleccionado = null;

      this.cdr.detectChanges();
    });
  }

  generarDiasSemana(fechaBase: Date) {
    this.dias = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(fechaBase);
      d.setDate(fechaBase.getDate() + i);
      this.dias.push(d.toISOString().slice(0, 10));
    }
  }

  cargarTablaBoletos() {
    if (!this.vehiculoSeleccionado || !this.ciudadSeleccionada || !this.fechaConsulta) {
      alert('Selecciona vehículo, ciudad y fecha');
      return;
    }

    const fechaInicio = new Date(this.fechaConsulta);
    this.generarDiasSemana(fechaInicio);

    this.boletosService
      .getBoletosSemana(this.vehiculoSeleccionado.id_vehiculo, this.ciudadSeleccionada.id_ciudad, this.dias[0])
      .subscribe((data) => {
        const boletosExistentes = data.boletos;
        this.totalesDiarios = data.totalesDiarios;
        this.totalGeneral = data.totalGeneral;

        this.boletosService.getTiposBoletoPorCiudad(this.ciudadSeleccionada!.id_ciudad)
          .subscribe((tipos) => {
            this.tablaBoletos = tipos.map(tipo => {
              const cantidadesOriginales = this.dias.map(dia => {
                const existente = boletosExistentes.find((b: any) =>
                  b.id_tipo_boleto === tipo.id_tipo_boleto && b.fecha === dia
                );
                return existente ? existente.cantidad : 0;
              });

              return {
                id_tipo_boleto: tipo.id_tipo_boleto,
                nombre: tipo.nombre,
                valor: tipo.precio,
                cantidades: [...cantidadesOriginales]
              };
            });

            this.cdr.detectChanges();
          });
      });
  }

  guardarBoletos() {
    if (!this.vehiculoSeleccionado || !this.ciudadSeleccionada || !this.fechaConsulta) return;

    this.boletosService.guardarBoletos(
      this.vehiculoSeleccionado.id_vehiculo,
      this.ciudadSeleccionada.id_ciudad,
      this.tablaBoletos,
      this.dias
    ).subscribe({
      next: () => alert('Boletos guardados correctamente'),
      error: err => console.error(err)
    });
  }

  verRegistros() {
    if (!this.vehiculoSeleccionado || !this.ciudadSeleccionada || !this.fechaConsulta) {
      alert('Selecciona vehículo, ciudad y fecha');
      return;
    }

    const fechaBase = new Date(this.fechaConsulta);
    const day = fechaBase.getUTCDay();
    const diffToMonday = (day === 0) ? -6 : 1 - day;
    const monday = new Date(fechaBase);
    monday.setDate(fechaBase.getDate() + diffToMonday);

    this.diasRegistros = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      this.diasRegistros.push(d.toISOString().slice(0, 10));
    }

    this.boletosService
      .getBoletosSemana(this.vehiculoSeleccionado.id_vehiculo, this.ciudadSeleccionada.id_ciudad, this.fechaConsulta)
      .subscribe((data) => {
        const boletosExistentes = data.boletos;
        this.totalesDiarios = data.totalesDiarios;
        this.totalGeneral = data.totalGeneral;

        const registrosMap = new Map<number, any>();
        boletosExistentes.forEach(b => {
          if (!registrosMap.has(b.id_tipo_boleto)) {
            registrosMap.set(b.id_tipo_boleto, {
              id_tipo_boleto: b.id_tipo_boleto,
              nombre: this.ciudadSeleccionada!.nombre,
              valor: b.precio,
              cantidades: new Array(this.diasRegistros.length).fill(0)
            });
          }
          const registro = registrosMap.get(b.id_tipo_boleto);
          const fechaStr = b.fecha.slice(0, 10);
          const index = this.diasRegistros.findIndex(dia => dia === fechaStr);
          if (index >= 0) registro.cantidades[index] = b.cantidad;
        });

        this.registros = Array.from(registrosMap.values()).map(r => {
          const totalBoletos = r.cantidades.reduce((a: number, b: number) => a + b, 0);
          return {
            ...r,
            totalBoletos,
            valorTotal: totalBoletos * r.valor
          };
        });

        this.registrosTotalesBoletos = this.registros.reduce((sum, r) => sum + r.totalBoletos, 0);

        this.cdr.detectChanges();
      });
  }

  onCantidadChange(fila: any, index: number, valor: number) {
    fila.cantidades[index] = valor ?? 0;
  }

  trackByFila(index: number) { return index; }
  trackByIndex(index: number) { return index; }

}
