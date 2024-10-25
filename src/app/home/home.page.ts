import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Geolocation } from '@capacitor/geolocation';
import { Persona } from '../agregar/agregar.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
=======
import { Persona } from '../agregar/agregar.page';
>>>>>>> origin/0.4

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

<<<<<<< HEAD
  constructor(private firestore:AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {}

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
=======
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private router: Router
  ) {}
>>>>>>> origin/0.4

  async login() {
    if (this.username && this.password) {
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(this.username, this.password);
<<<<<<< HEAD

        const userId = userCredential.user?.uid;

        if (userId) {
          try {
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
=======
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
              
>>>>>>> origin/0.4
            }
          } catch (error) {
            console.error('Error al obtener el documento de Firestore:', error);
          }
        }
<<<<<<< HEAD
        
    
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
=======
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
>>>>>>> origin/0.4
      }
    } else {
      // Manejo de errores para campos vacíos
      if (!this.username) this.usernameError = true;
      if (!this.password || this.password.length < 5) this.passwordError = true;
    }    
<<<<<<< HEAD
    
  }
}
=======
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
>>>>>>> origin/0.4
