

import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router' 

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  username: string = '';
  usernameError: boolean = false;
  nullField: boolean = false;

  constructor(private alertController: AlertController, private router: Router) {}

  async resetPassword() {
    if (!this.fieldNotNull(this.username)){
      const alert = await this.alertController.create({
        header: 'Debe ingresar un mail',
        subHeader: 'Favor ingresar un mail con formato',
        message: 'user@mail.com',
        buttons: ['Ok'],
      });

      await alert.present();
    }else{
      if (!this.validateEmail(this.username)) {
        this.usernameError = true;
      } else {
        this.usernameError = false;
        const alert = await this.alertController.create({
          header: 'Recuperación de contraseña',
          message: 'Se ha enviado un correo de recuperación a ' + this.username + '.',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/home']);
              }

            }
          
          ],
        });
        await alert.present();
      }
    }
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  fieldNotNull(email: string): boolean {
    if (email == null || email == '') {
      return false
    }else{
      return true
    }
  }
}