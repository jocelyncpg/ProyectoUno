import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {
  persona = {
    nombre: '',
    apellido: '',
    esProfesor: false,
  };

  constructor(private firestore: AngularFirestore, private alertController: AlertController) {}

  // Función para guardar información
  async guardar() {
    if (!this.persona.nombre || !this.persona.apellido) {
      await this.showAlert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const data = {
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      esProfesor: this.persona.esProfesor,
    };

    try {
      await this.firestore.collection('usuarios').add(data);
      await this.showAlert('Éxito', 'Guardado exitosamente.');
      this.limpiarFormulario();
    } catch (error) {
      console.error('Error al guardar: ', error);
      await this.showAlert('Error', 'Ocurrió un problema al guardar.');
    }
  }

  // Función para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Limpiar el formulario después de guardar
  limpiarFormulario() {
    this.persona.nombre = '';
    this.persona.apellido = '';
    this.persona.esProfesor = false;
  }
}
