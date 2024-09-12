import { Component, OnInit, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  asignaturas: { nombre: string, profesor: string}[] = [];

  asignaturaSelected: string =  '';

  constructor(private alertController: AlertController, private router: Router, private elementRef: ElementRef) { }

  ngOnInit() {
    this.asignaturas = [
      {nombre: 'Programación de Aplicaciónes Moviles', profesor: 'Patricio Hernandez'},
      {nombre: 'Programación de Base de Datos', profesor: 'Monkey D. Luffy'},
      {nombre: 'Matematicas', profesor: 'Jorge Gonzales'},
      {nombre: 'Calidad de Software', profesor: 'Vito Corleone'}
    ]
  }

  ionViewWillEnter() {
    // Aquí puedes forzar la actualización del estado o hacer cualquier inicialización necesaria
    this.resetRippleEffect();
  }

  resetRippleEffect() {
    // Reemplaza el contenido de la lista para forzar el re-render
    this.asignaturas = [...this.asignaturas];
  }

  ngAfterViewInit() {
    const img = this.elementRef.nativeElement.querySelector('.img-dev');
    img.classList.add('animate');
  }
  
  async test(asignatura: string) {
    this.asignaturaSelected = asignatura;
    this.router.navigate(['/asistencia'], { queryParams: { asignaturaSelected: this.asignaturaSelected } });
  }
}
