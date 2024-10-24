import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CursoService, Curso } from '../services/curso.service';
import { Timestamp } from 'firebase/firestore';
import { arrayUnion } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit { // Implementar OnInit
  asignaturaSelected: string = '';

  constructor(
    private firestore: AngularFirestore, 
    private cursoService: CursoService,
    private route: ActivatedRoute // Inyectar ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.asignaturaSelected = params['asignaturaSelected'] || ''; // Asignar el valor del parámetro
      console.log('Asignatura seleccionada:', this.asignaturaSelected); // Verificar el valor
    });
  }

  async crearCurso() {
    console.log(this.asignaturaSelected);
    try {
      const nuevoCurso: Curso = {
        asignatura: this.asignaturaSelected,
        fechaClase: new Date(Timestamp.now().toDate().getTime()), // Fecha actual en formato Date
      };

      const cursoId = await this.cursoService.addCurso(nuevoCurso);
      alert('Clase creada');

      const personasRef = this.firestore.collection('personas', ref =>
        ref.where('asignatura', 'array-contains', this.asignaturaSelected)
      );

      const querySnapshot = await personasRef.get().toPromise();

      if (querySnapshot && !querySnapshot.empty) {
        const batch = this.firestore.firestore.batch();

        querySnapshot.docs.forEach(docSnap => {
          const personRef = this.firestore.collection('personas').doc(docSnap.id).ref;
          batch.update(personRef, {
            curso: arrayUnion({
              idCurso: cursoId, 
              presente: false 
            })
          });
        });

        await batch.commit();
        alert("ID del curso agregado a todas las personas con la asignatura.");
      } else {
        alert("No se encontraron personas con la asignatura especificada.");
      }
    } catch (error) {
      console.error('Error al crear curso:', error);
    }
  }
}