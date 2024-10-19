import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';  

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {
  persona = {
    nombre: '',
    apellido: '',
    asignatura: '',
    curso: '',
    esProfesor: false
  };

  constructor(
    private firestore: AngularFirestore,  
    private alertController: AlertController  
  ) {}

  async submitForm() {
    const fullName = `${this.persona.nombre.toLowerCase()} ${this.persona.apellido.toLowerCase()}`;

    
    const userRef = this.firestore.collection('personas', ref =>
      ref.where('nombreCompleto', '==', fullName)
    );

    userRef.get().subscribe(async (snapshot) => {
      if (!snapshot.empty) {
        
        await this.presentAlert('Error', 'Este usuario ya está registrado.');
      } else {
        
        this.firestore.collection('personas').add({
          nombre: this.persona.nombre,
          apellido: this.persona.apellido,
          asignatura: this.persona.asignatura,
          curso: this.persona.curso,
          esProfesor: this.persona.esProfesor,
          nombreCompleto: fullName  
        }).then(async () => {
          await this.presentAlert('Registro Exitoso', 'La persona ha sido registrada correctamente.');

          this.resetForm();
        }).catch(async (error) => {
          console.error('Error al registrar: ', error);
          await this.presentAlert('Error', 'Hubo un error al registrar. Inténtalo de nuevo.');
        });
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }


  resetForm() {
    this.persona = {
      nombre: '',
      apellido: '',
      asignatura: '',
      curso: '',
      esProfesor: false
    };
  }
}
