import { Component, OnInit } from '@angular/core';
import { CursoService, Curso } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
})
export class CursoComponent  implements OnInit {
  curso:Curso = {asignatura:"", fechaClase:new Date()}
  constructor(private cursoService:CursoService) { }

  ngOnInit() {}

  addCurso(){
    this.cursoService.addCurso(this.curso).then(()=>{
      alert("Agregado Correctamente")
      this.curso = {asignatura:"", fechaClase:new Date()}
    }).catch(error=>{alert("Error al ingresar "+error)})
  }
}
