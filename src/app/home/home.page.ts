import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
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
  successMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router
  ) {}

  async login() {
    // Resetear errores
    this.usernameError = !this.validateEmail(this.username);
    this.passwordError = this.password.length < 5;

    // Verificar si hay errores
    if (this.usernameError || this.passwordError) {
      return;
    }

    try {
      
      await this.afAuth.signInWithEmailAndPassword(this.username, this.password);
      console.log('Inicio de sesión exitoso');
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      await this.showAlert('Error', 'Error al iniciar sesión. Verifica tus credenciales.');
    }
  }

 
  async checkUserExists() {
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
      await this.showAlert('Error', 'Usuario ya existe. Prueba con otro.');
    }
  }

  
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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
