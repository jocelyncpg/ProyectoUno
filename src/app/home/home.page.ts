import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  usernameError: boolean = false;
  passwordError: boolean = false;
  userExists: boolean = false;
  successMessage: string = ''; // Variable para el mensaje de éxito

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async register() {
    if (this.username && this.password) {
      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.username, this.password);
        console.log('User registered successfully:', userCredential);
        alert("Alumno registrado exitosamente! ");
        this.userExists = false; // Reinicia el mensaje de usuario existente
        // Espera un momento para que el mensaje sea visible
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirige al login
        }, 3000); // Redirige después de 3 segundos
      } catch (error) {
        console.error('Error registering user:', error);
        this.userExists = true; // Activa la variable para mostrar un mensaje de error
        this.successMessage = ''; // Reinicia el mensaje de éxito en caso de error
      }
    } else {
      if (!this.username) this.usernameError = true;
      if (!this.password || this.password.length < 5) this.passwordError = true;
    }
  }

  async login() {
    if (this.username && this.password) {
      try {
        await this.afAuth.signInWithEmailAndPassword(this.username, this.password);
        this.router.navigate(['/login']); // Asegúrate de redirigir a la página de asistencia
      } catch (error) {
        console.error('Error logging in:', error);
      }
    } else {
      if (!this.username) this.usernameError = true;
      if (!this.password || this.password.length < 5) this.passwordError = true;
    }
  }
}
