import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Persona } from '../agregar/agregar.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

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
  successMessage: string = ''; 

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth, private router: Router, private alertController: AlertController) {}
 
  async register() {
    if (this.username && this.password) {
      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.username, this.password);
        console.log('User registered successfully:', userCredential);
        alert("Usuario registrado exitosamente! ");
        this.userExists = false; 
        
        setTimeout(() => {
          this.router.navigate(['/login']); 
        }, 3000); 
      } catch (error) {
        console.error('Error registering user:', error);
        this.userExists = true; 
        this.successMessage = ''; 
      }
    } else {
      if (!this.username) this.usernameError = true;
      if (!this.password || this.password.length < 5) this.passwordError = true;
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async login() {
    if (this.username && this.password) {
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(this.username, this.password);
        const userId = userCredential.user?.uid;

        if (userId) {
          const personaDoc = await this.firestore.collection('personas').doc(userId).get().toPromise();
          if (personaDoc && personaDoc.exists) {
            const personaData = personaDoc.data() as Persona || {}; 
            if (personaData.esProfesor === true) {
              this.router.navigate(['/homeProfe']);
            } else {
              this.router.navigate(['/login']);
            }
          } else {
            console.error('El documento del usuario no existe en la colección personas.');
          }
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        await this.presentAlert('Error de autenticación', 'Correo o contraseña incorrectos. Inténtalo de nuevo.');
      }
    } else {
      if (!this.username) this.usernameError = true;
      if (!this.password || this.password.length < 5) {
        this.passwordError = true;
        await this.presentAlert('Error en la contraseña', 'La contraseña debe tener al menos 5 caracteres.');
      }
    }
  }
}