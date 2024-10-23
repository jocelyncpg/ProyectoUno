import { Component, OnInit, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignatura-profe',
  templateUrl: './asignatura-profe.page.html',
  styleUrls: ['./asignatura-profe.page.scss'],
})
export class AsignaturaProfePage implements OnInit {
  // Solo contiene el nombre de las asignaturas
  asignaturasProfe: { nombre: string }[] = []; 
  asignaturaSelected: string = '';

  constructor(private alertController: AlertController, private router: Router, private elementRef: ElementRef) { }

  ngOnInit() {
    // Aquí defines las asignaturas que el profesor puede ver
    this.asignaturasProfe = [
      { nombre: 'Programación de Aplicaciones Móviles' },
      { nombre: 'Programación de Base de Datos' },
      { nombre: 'Matemáticas' },
      { nombre: 'Calidad de Software' }
    ];
  }

  ionViewWillEnter() {
    // Aquí puedes forzar la actualización del estado o hacer cualquier inicialización necesaria
    this.resetRippleEffect();
  }

  resetRippleEffect() {
    // Reemplaza el contenido de la lista para forzar el re-render
    this.asignaturasProfe = [...this.asignaturasProfe];
  }

  ngAfterViewInit() {
    const img = this.elementRef.nativeElement.querySelector('.img-dev');
    img.classList.add('animate');
  }
  
  async test(asignatura: string) {
    this.asignaturaSelected = asignatura;
    // Navega a la página de QR
    this.router.navigate(['/qr'], { queryParams: { asignaturaSelected: this.asignaturaSelected } });
  }
}
