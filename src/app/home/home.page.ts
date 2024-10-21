import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

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
  latitude: number = 0; 
  longitude: number = 0; 

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.getCurrentLocation();
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log('Latitud:', this.latitude, 'Longitud:', this.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      alert('No se pudo obtener la ubicación. Asegúrate de que los permisos estén habilitados.');
    }
  }
  
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

  async login() {
    if (this.username && this.password) {
      try {
        // Intenta iniciar sesión con el correo y la contraseña proporcionados
        await this.afAuth.signInWithEmailAndPassword(this.username, this.password);
        
        // Verifica si el correo tiene la extensión @profeduoc.cl
        if (this.username.endsWith('@profeduoc.cl')) {
          // Redirige al home de bienvenida del profesor
          this.router.navigate(['/homeProfe']); // Asegúrate de que esta ruta esté definida en tu archivo de rutas
        } else {
          // Redirige al login del alumno
          this.router.navigate(['/login']); // Asegúrate de que esta ruta esté definida en tu archivo de rutas
        }
  
      } catch (error) {
        console.error('Error logging in:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    } else {
      // Manejo de errores para campos vacíos
      if (!this.username) this.usernameError = true;
      if (!this.password || this.password.length < 5) this.passwordError = true;
    }
  }
}