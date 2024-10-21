import { Component, OnInit } from '@angular/core';
import { AsignaturaService,Asignatura } from 'src/app/services/asignatura.service';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.scss'],
})
export class AsignaturaComponent  implements OnInit {
  asignatura:Asignatura = {nombre:"", profesor:""}
  constructor(private asignaturaService:AsignaturaService) { }

  ngOnInit() {}

  addAsignatura(){
    this.asignaturaService.addAsignatura(this.asignatura).then(()=>{
      alert("Agregado Correctamente")
      this.asignatura = {nombre:"",profesor:""};
    }).catch(error=>{alert("Error al ingresar "+error)})
  }
}
