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
      console.log('Estamos en un dispositivo móvil');
    } else {
      console.log('Esta función solo está disponible en plataformas móviles');
    }
  }

  async checkPermissions(): Promise<boolean> {
    const status = await BarcodeScanner.checkPermission({ force: true });
  
    if (status.granted) {
      return true;
    } else if (status.denied) {
      alert('Permisos de cámara denegados. Habilítalos en la configuración.');
      return false;
    } else {
      alert('Permisos de cámara no otorgados.');
      return false;
    }
  }

  async startScan() {
    if (Capacitor.isNativePlatform()) {
      const hasPermission = await this.checkPermissions();
      if (!hasPermission) {
        return;
      }

      try {
        this.scanActive = true;
        const result = await BarcodeScanner.startScan();
        console.log(result);
        this.stopScan();
      } catch (error) {
        console.error('Error al escanear:', error);
        this.scanActive = false;
      }
    } else {
      console.log('Esta función solo está disponible en plataformas móviles');
    }
  }

  async stopScan() {
    if (Capacitor.isNativePlatform() && this.scanActive) {
      try {
        await BarcodeScanner.stopScan();
        this.scanActive = false;
      } catch (error) {
        console.error('Error al detener el escaneo:', error);
      }
    } else {
      console.log('Esta función solo está disponible en plataformas móviles');
    }
  }

  ionViewWillLeave() {
    this.stopScan(); // Detener escaneo al salir de la página
  }
}
