// src/app/asistencia/asistencia.page.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asistencias: { fecha: string, hora: string }[] = [];

  ngOnInit() {
    // Aquí deberías cargar los datos reales de asistencia, por ahora solo se muestra un ejemplo
    this.asistencias = [
      { fecha: '2024-09-01', hora: '08:00' },
      { fecha: '2024-09-01', hora: '10:00' },
      { fecha: '2024-09-01', hora: '12:00' },
      { fecha: '2024-09-01', hora: '14:00' },
      { fecha: '2024-09-01', hora: '19:20' },
    ];
  }
}
