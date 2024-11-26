import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clase-qr',
  templateUrl: './clase-qr.page.html',
  styleUrls: ['./clase-qr.page.scss'],
})
export class ClaseQRPage implements OnInit {

  nombre: string = '';
  claseSelected: string = '';
  qrData: string = '';
  asignatura: string = '';

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.aRoute.queryParams.subscribe(params => {
      this.claseSelected = params['clase'] || '';
      this.nombre = params['nombre'] || '';
      this.asignatura = params['asignaturaSelected']
      this.qrData = this.claseSelected; 
    })

    console.log(this.claseSelected)
    console.log(this.nombre)
  }

  async cambiarPag() {
    this.router.navigate(['/qr'], { queryParams: {asignaturaSelected: this.asignatura, nombre: this.nombre}})
  }

}
