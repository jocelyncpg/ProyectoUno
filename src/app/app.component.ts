
import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      // Código para plataformas móviles
      console.log('Aplicación corriendo en un dispositivo móvil');
    } else {
      console.log('Esta función solo está disponible en plataformas móviles');
    }
  }
}
