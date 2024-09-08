import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { StorageService } from '../storage.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {
  username: string = '';
  private animation?: Animation;

  constructor(
    private route: ActivatedRoute,
    private aCtrl: AnimationController,
    private storageService: StorageService
  ) {}

  async ionViewWillEnter() {
    const storedUsername = await this.storageService.get('username');
    
    if (storedUsername) {
      console.log('LocalStorage')
      this.username = storedUsername;
    }else{
      console.log('Params')
      this.route.queryParams.subscribe(params => {
        this.username = params['username'] || 'Usuario';
      });
    }
    
  }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.animation = this.aCtrl.create()
      .addElement(document.querySelector('.square') as HTMLElement)
      .duration(2000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, background: 'red', transform: 'translateX(-150px)' },
        { offset: 0.1, background: 'yellow' },
        { offset: 0.3, background: 'purple' },
        { offset: 0.7, background: 'gold' },
        { offset: 1, background: 'blue', transform: 'translateX(426px)' },
      ]);
  }

  activar() {
    if (this.animation) {
      this.animation.play();
    } else {
      console.log("No se definió la animación");
    }
  }

  pausar() {
    if (this.animation) {
      this.animation.pause();
    } else {
      console.log("No se definió la animación");
    }
  }

  detener() {
    if (this.animation) {
      this.animation.stop();
    } else {
      console.log("No se definió la animación");
    }
  }
}
