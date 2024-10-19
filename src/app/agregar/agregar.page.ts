import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Asegúrate de que Firebase esté configurado correctamente

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
    private firestore: AngularFirestore,  // Inyectamos el servicio de Firestore
    private alertController: AlertController  // Inyectamos el controlador de alertas
  ) {}

  async submitForm() {
    const fullName = `${this.persona.nombre.toLowerCase()} ${this.persona.apellido.toLowerCase()}`;

    // Busca si ya existe un usuario con ese nombre y apellido
    const userRef = this.firestore.collection('personas', ref =>
      ref.where('nombreCompleto', '==', fullName)
    );

    userRef.get().subscribe(async (snapshot) => {
      if (!snapshot.empty) {
        // Si ya existe, mostramos una alerta de error
        await this.presentAlert('Error', 'Este usuario ya está registrado.');
      } else {
        // Si no existe, lo registramos y mostramos una alerta de éxito
        this.firestore.collection('personas').add({
          nombre: this.persona.nombre,
          apellido: this.persona.apellido,
          asignatura: this.persona.asignatura,
          curso: this.persona.curso,
          esProfesor: this.persona.esProfesor,
          nombreCompleto: fullName  // Guardamos un campo con el nombre completo para facilitar la búsqueda
        }).then(async () => {
          await this.presentAlert('Registro Exitoso', 'La persona ha sido registrada correctamente.');
          // Limpiar el formulario después del registro exitoso
          this.resetForm();
        }).catch(async (error) => {
          console.error('Error al registrar: ', error);
          await this.presentAlert('Error', 'Hubo un error al registrar. Inténtalo de nuevo.');
        });
      }
    });
  }

  // Método para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para resetear el formulario después de un registro exitoso
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
