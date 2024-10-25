import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CursoService, Curso } from '../services/curso.service';
import { Timestamp } from 'firebase/firestore';
import { arrayUnion } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit { 
  asignaturaSelected: string = '';
  nombre: string = '';

  constructor(
    private firestore: AngularFirestore, 
    private cursoService: CursoService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.asignaturaSelected = params['asignaturaSelected'] || ''; 
      this.nombre = params['nombre'] || '';
    });
  }

  async crearCurso() {
    console.log(this.asignaturaSelected);
    try {
      const nuevoCurso: Curso = {
        asignatura: this.asignaturaSelected,
        fechaClase: new Date(Timestamp.now().toDate().getTime()), 
      };

      const cursoId = await this.cursoService.addCurso(nuevoCurso);

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
        alert("Clase Creada con Exito.");
      } else {
        alert("No se encontraron personas con la asignatura especificada.");
      }
    } catch (error) {
      console.error('Error al crear curso:', error);
    }
  }
}