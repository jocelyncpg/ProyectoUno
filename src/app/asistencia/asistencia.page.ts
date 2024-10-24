// src/app/asistencia/asistencia.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService, Curso } from '../services/curso.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore'; 

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asignaturaSelected: string = '';
  asistencias:Curso[]=[];

  constructor(private route: ActivatedRoute,
              private cursoService:CursoService,
              private firestore:AngularFirestore
  ) {}

  ngOnInit() {
    this.cursoService.getCurso().subscribe(asistencia => {
      this.asistencias = asistencia.map(asist => {
        if (asist.fechaClase instanceof Timestamp) {
          asist.fechaClase = asist.fechaClase.toDate();
        }
        return asist;
      });
    });

  }
}
