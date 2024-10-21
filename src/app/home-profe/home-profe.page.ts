import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-profe',
  templateUrl: './home-profe.page.html',
  styleUrls: ['./home-profe.page.scss'],
})
export class HomeProfePage {
  username: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      this.username = user?.email ?? 'Profesor'; // Obtiene el correo del usuario
    });
  }

  async logout() {
    try {
      await this.afAuth.signOut(); // Cierra sesión
      this.router.navigate(['/home']); // Redirige al login
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  }
}

