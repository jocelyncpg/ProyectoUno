import { Component, OnInit, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AsignaturaService, Asignatura } from '../services/asignatura.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from '../services/auth.service';  
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Persona } from '../agregar/agregar.page';

@Component({
  selector: 'app-asignatura-profe',
  templateUrl: './asignatura-profe.page.html',
  styleUrls: ['./asignatura-profe.page.scss'],
})
export class AsignaturaProfePage implements OnInit {
  
  asignaturas:Asignatura[]=[];

  asignaturaSelected: string =  '';

  constructor(private firestore:AngularFirestore, 
              private asignaturaService:AsignaturaService,
              private alertController: AlertController, 
              private router: Router, 
              private elementRef: ElementRef) { }

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user?.uid
    if(uid) {
      this.firestore.collection('personas').doc(uid).get().subscribe(async (doc) => {
        if (doc.exists) { 
          const personaData = doc.data() as Persona;
          const asignaturaIds = personaData.asignatura || [];
          console.log(asignaturaIds)
    
          this.asignaturaService.getAsignaturasByIds(asignaturaIds).subscribe(asignatura => {
            console.log(asignatura);
            this.asignaturas = asignatura;
          });
        } else {
          alert('No se encontró el usuario.');
        }
      });
    }
  }

  ionViewWillEnter() {
    this.resetRippleEffect();
  }

  resetRippleEffect() {
    this.asignaturas = [...this.asignaturas];
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
