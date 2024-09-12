// src/app/asistencia/asistencia.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asignaturaSelected: string = '';
  asistencias: { asignatura: string, fecha: string, hora: string , presente: boolean}[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.asignaturaSelected = params['asignaturaSelected'];
    });
    // Aquí deberías cargar los datos reales de asistencia, por ahora solo se muestra un ejemplo
    this.asistencias = [
      { asignatura: "Programación de Aplicaciónes Moviles", fecha: '2024-09-01', hora: '08:00', presente: true},
      { asignatura: "Programación de Base de Datos", fecha: '2024-09-01', hora: '10:00', presente: true },
      { asignatura: "Matematicas", fecha: '2024-09-01', hora: '12:00', presente: false },
      { asignatura: "Calidad de Software", fecha: '2024-09-01', hora: '14:00', presente: true },
      { asignatura: "Programación de Base de Datos", fecha: '2024-09-03', hora: '10:20', presente: false },
      { asignatura: "Matematicas", fecha: '2024-09-03', hora: '14:30', presente: true },
      { asignatura: "Matematicas", fecha: '2024-09-04', hora: '10:30', presente: false },
      { asignatura: "Programación de Aplicaciónes Moviles", fecha: '2024-09-04', hora: '13:00', presente: false }
    ];
  }
}
