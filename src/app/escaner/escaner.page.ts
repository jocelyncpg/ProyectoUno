// src/app/escaner/escaner.page.ts
import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage implements OnInit {
  scanActive: boolean = false;

  constructor() {}

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      // Código para plataformas móviles
      console.log('Estamos en un dispositivo móvil');
    } else {
      console.log('Esta función solo está disponible en plataformas móviles');
    }
  }

  async startScan() {
    if (Capacitor.isNativePlatform()) {
      try {
        this.scanActive = true; // Activar el estado de escaneo
        const result = await BarcodeScanner.startScan();
        console.log(result);
        this.stopScan(); // Detener el escaneo cuando se obtiene un resultado
      } catch (error) {
        console.error('Error al escanear:', error);
        this.scanActive = false; // Detener el estado de escaneo en caso de error
      }
    } else {
      console.log('Esta función solo está disponible en plataformas móviles');
    }
  }

  async stopScan() {
    if (Capacitor.isNativePlatform() && this.scanActive) {
      try {
        await BarcodeScanner.stopScan();
        this.scanActive = false; // Detener el estado de escaneo
      } catch (error) {
        console.error('Error al detener el escaneo:', error);
      }
    } else {
      console.log('Esta función solo está disponible en plataformas móviles');
    }
  }
}
