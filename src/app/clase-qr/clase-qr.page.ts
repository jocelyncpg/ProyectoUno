import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clase-qr',
  templateUrl: './clase-qr.page.html',
  styleUrls: ['./clase-qr.page.scss'],
})
export class ClaseQRPage implements OnInit {

  nombre: string = '';
  claseSelected: string = '';
  qrData: string = '';


  constructor(
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.aRoute.queryParams.subscribe(params => {
      this.claseSelected = params['clase'] || '';
      this.nombre = params['nombre'] || '';
      this.qrData = this.claseSelected; 
    })

    console.log(this.claseSelected)
    console.log(this.nombre)
  }

}
