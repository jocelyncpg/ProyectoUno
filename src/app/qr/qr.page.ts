import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  asignaturaSeleccionada: string = ''; // Inicialización aquí

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el parámetro de consulta de la asignatura seleccionada
    this.route.queryParams.subscribe(params => {
      this.asignaturaSeleccionada = params['asignaturaSelected'];
      // Aquí puedes realizar cualquier acción necesaria con la asignatura seleccionada
      console.log('Asignatura seleccionada para QR:', this.asignaturaSeleccionada);
    });
  }
}
