import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Persona } from '../agregar/agregar.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = "";
  password: string = "";
  usernameError: boolean = false;
  passwordError: boolean = false;
  userExists: boolean = false;
  successMessage: string = '';
  errorMessage: string = ''; // Mensaje de error adicional

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private router: Router
  ) {}

  async login() {
    if (this.username && this.password) {
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(this.username, this.password);
        const userId = userCredential.user?.uid;
  
        console.log('User ID:', userId); // Agrega aquí
  
        if (userId) {
          try {
            const personaDoc = await this.firestore.collection('personas').doc(userId).get().toPromise();
  
            // Verifica si personaDoc existe antes de acceder a data()
            if (personaDoc) {
              console.log('Documento persona:', personaDoc.data()); // Agrega aquí
  
              if (personaDoc && personaDoc.exists) {
                const personaData = personaDoc.data() as Persona || {}; 
                if (personaData.esProfesor === true) {
                  this.router.navigate(["/homeProfe"]);
                } else {
                  this.router.navigate(["/login"]); // Redirigir a la página home
                }
              } else {
                console.log('Usuario autenticado:', userId);
                console.log('Documento persona:', personaDoc); // Verifica el contenido completo
                // Agrega aquí
              }
            } else {
              console.log('personaDoc es undefined'); // Agrega aquí
              
            }
          } catch (error) {
            console.error('Error al obtener el documento de Firestore:', error);
          }
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    } else {
      if (!this.username) this.usernameError = true;
      if (!this.password || this.password.length < 5) this.passwordError = true;
    }    
  }
  



  async register() {
    const users = await this.afAuth.fetchSignInMethodsForEmail(this.username);
    if (users.length > 0) {
      this.userExists = true; // Usuario ya existe
      await this.showAlert('Usuario ya existe', 'Prueba con otro correo.');
    } else {
      this.userExists = false; // Usuario no existe, procede a registrar
      await this.registerUser();
    }
  }

  async registerUser() {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.username, this.password);
      this.successMessage = 'Usuario registrado exitosamente.';
      this.router.navigate(['/agregar']); 
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      await this.showAlert('Error', 'Usuario ya existe');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
