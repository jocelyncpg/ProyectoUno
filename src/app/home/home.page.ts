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
  errorMessage: string = '';

  constructor(private alertController:AlertController,private firestore:AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {

  }
  
  async register() {
    if (this.username && this.password) {
      try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.username, this.password);
        console.log('User registered successfully:', userCredential);
        alert("Usuario registrado exitosamente! ");
        this.userExists = false; 
        
        setTimeout(() => {
          this.router.navigate(['/agregar']); 
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
