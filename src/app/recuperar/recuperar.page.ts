

import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  username: string = '';
  usernameError: boolean = false;

  constructor(private alertController: AlertController) {}

  async resetPassword() {
    if (!this.validateEmail(this.username)) {
      this.usernameError = true;
    } else {
      this.usernameError = false;
      const alert = await this.alertController.create({
        header: 'Recuperación de contraseña',
        message: 'Se ha enviado un correo de recuperación a ' + this.username + '.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}