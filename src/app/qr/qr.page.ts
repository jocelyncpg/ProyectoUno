import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CursoService, Curso } from '../services/curso.service';
import { Timestamp } from 'firebase/firestore';
import { arrayUnion } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router'; 
import { getAuth } from 'firebase/auth';
import { Persona } from '../agregar/agregar.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit { 
  asignaturaSelected: string = '';
  nombre: string = '';
  claseSelected: string = '';
  asistencias:Curso[]=[];

  constructor(
    private firestore: AngularFirestore, 
    private cursoService: CursoService,
    private aRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.aRoute.queryParams.subscribe(params => {
      this.asignaturaSelected = params['asignaturaSelected'] || ''; 
      this.nombre = params['nombre'] || '';
    });
  }

  ionViewWillEnter(){
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid;

    if (uid) {
      this.firestore.collection('personas').doc(uid).get().subscribe(async (doc) => {
        if (doc.exists) {
          const personaData = doc.data() as Persona
          const cursosPersona = Array.isArray(personaData.curso) ? personaData.curso : [];

          this.cursoService.getCursosByAsignaturaId(this.asignaturaSelected).subscribe(cursos => {
            this.asistencias = cursos.map(curso => {
              const cursoPersona = cursosPersona.find(c => c.idCurso === curso.id);
              curso.presente = cursoPersona ? cursoPersona.presente : false;

              if(curso.fechaClase instanceof Timestamp) {
                curso.fechaClase = curso.fechaClase.toDate();
              }
              return curso
            })
          })
        }
      })
    }
  }

  async crearCurso() {
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

  async cambiarPage(clase: string, nombre: string){
    this.claseSelected = clase;
    this.nombre = nombre;
    this.route.navigate(['/clase-qr'], {queryParams: { clase: this.claseSelected, nombre: this.nombre, asignaturaSelected: this.asignaturaSelected}})
  }
}