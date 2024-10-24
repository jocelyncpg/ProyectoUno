import { Component, OnInit } from '@angular/core';
import { AsignaturaService,Asignatura } from 'src/app/services/asignatura.service';
import { Persona } from 'src/app/agregar/agregar.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.scss'],
})
export class AsignaturaComponent  implements OnInit {
  asignatura:Asignatura = {id:"", nombre:"", profesor: ""}
  nombreCompleto: string = "";
  constructor(private firestore:AngularFirestore, private asignaturaService:AsignaturaService) { }

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    const uid = user?.uid
    if(uid) {
      this.firestore.collection('personas').doc(uid).get().subscribe(async (doc) => {
        const personaData = doc.data() as Persona;
        console.log(personaData)
        this.nombreCompleto = personaData.nombreCompleto;
        this.asignatura.profesor = this.nombreCompleto;
      })
    }else {
      alert('No se encontro usuario')
    }
  }

  addAsignatura(){
    this.asignaturaService.addAsignatura(this.asignatura).then((asignaturaId)=>{
      alert("Agregado Correctamente")
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user?.uid;
      if (uid) {
        this.firestore.collection('personas').doc(uid).update({
          asignatura: firebase.firestore.FieldValue.arrayUnion(asignaturaId)
        }).then(() => {
          alert("ID de asignatura agregado al array 'asignaturas'");
          this.asignatura.nombre = ""; 
        }).catch(error => {
          alert("Error al agregar ID de asignatura: " + error);
        });
      }
    }).catch(error=>{alert("Error al ingresar "+error)})
  }
}
