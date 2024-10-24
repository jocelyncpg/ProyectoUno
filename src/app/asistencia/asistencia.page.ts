// src/app/asistencia/asistencia.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService, Curso } from '../services/curso.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore'; 
import { Persona } from '../agregar/agregar.page';
import { getAuth } from 'firebase/auth';
import { Asignatura } from '../services/asignatura.service';

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
    // Obtener el parámetro de asignatura desde la URL (si existe)
    this.route.queryParamMap.subscribe(params => {
      this.asignaturaSelected = params.get('asignaturaSelected') || '';  // Obtener el ID de la asignatura de los query parameters
    });
  }

  ionViewWillEnter() {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;
  
    if (uid) {
      this.firestore.collection('personas').doc(uid).get().subscribe(async (doc) => {
        if (doc.exists) {
          const personaData = doc.data() as Persona;          
          // Verifica si 'curso' es un arreglo
          const cursosPersona = Array.isArray(personaData.curso) ? personaData.curso : [];
  
          this.cursoService.getCursosByAsignaturaId(this.asignaturaSelected).subscribe(cursos => {
            console.log(cursos)
            this.asistencias = cursos.map(curso => {
              const cursoPersona = cursosPersona.find(c => c.idCurso === curso.id);
              curso.presente = cursoPersona ? cursoPersona.presente : false;
  
              if (curso.fechaClase instanceof Timestamp) {
                curso.fechaClase = curso.fechaClase.toDate();
              }
              return curso;
            });
          });
        }
      });
    }
  }  
}
