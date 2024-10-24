import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Timestamp } from 'rxjs';

export interface Curso{
  id?:string,
  asignatura:string,
  fechaClase:Date, 
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private collectionName="curso";
  constructor(private firestore:AngularFirestore) { }

  addCurso(curso:Curso): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set({...curso,id})
  }

  getCurso():Observable<Curso[]>{
    return this.firestore.collection<Curso>(this.collectionName).valueChanges();
  }

  getCursosByIds(cursoIds: string[]): Observable<Curso[]> {
    return this.firestore.collection<Curso>('curso', ref =>
      ref.where('id', 'in', cursoIds)
    ).valueChanges({ idField: 'id'});
  }
}
