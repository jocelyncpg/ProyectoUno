import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Asignatura{
  id?:number,
  nombre:string,
  profesor:string
}

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  private collectionName="asignatura";
  constructor(private firestore:AngularFirestore) { }

  addAsignatura(asignatura:Asignatura): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set({...asignatura,id})
  }

  getAsignatura():Observable<Asignatura[]>{
    return this.firestore.collection<Asignatura>(this.collectionName).valueChanges();
  }

  getAsignaturasByIds(asignaturaIds: string[]): Observable<Asignatura[]> {
    return this.firestore.collection<Asignatura>('asignatura', ref => 
      ref.where('id', 'in', asignaturaIds)
    ).valueChanges({ idField: 'id' });
  }

}
