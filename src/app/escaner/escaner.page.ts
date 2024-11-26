import { AfterViewInit, Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';

import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';

import { Persona } from '../agregar/agregar.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';


@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage implements OnInit, AfterViewInit {
  animation: Animation | null = null;

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  scannerControls!: IScannerControls; 
  scannedResult: string | null = null;


  constructor(private AlertController: AlertController, 
              private animationCtrl: AnimationController,
              private firestore: AngularFirestore
            ) {}

  ngOnInit() {}

  async presente(scannedResult: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('Usuario no autenticado');
      return;
    }

    const uid = user.uid;

    try {
      const personaDoc = this.firestore.collection('personas').doc(uid);
      const personaSnapshot = await personaDoc.get().toPromise();

      if (personaSnapshot?.exists) {
        const personaData = personaSnapshot.data() as Persona;
        const cursos = personaData.curso || [];

        const cursoIndex = cursos.findIndex((c: any) => c.idCurso === scannedResult);

        if (cursoIndex !== -1) {
          cursos[cursoIndex].presente = true;

          await personaDoc.update({ curso: cursos });
          alert('Asistencia marcada correctamente');
        } else {
          alert('Curso no encontrado para el usuario actual');
        }
      } else {
        alert('No se encontró el documento del usuario actual');
      }
    } catch (error) {
      console.error('Error al actualizar la asistencia:', error);
      alert('Hubo un error al marcar la asistencia');
    }
  }

  async startScanning () {
    try {
      const code = await this.scanning();
      if (!code) {
        alert('QR no detectado')
        return;
      }
      alert('QR detectado')
      this.presente(code);
    } catch(e) {
      console.log(e)
    }
  }

  async scanning(val?: number) {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: val || 17,
        cameraDirection: 1
      });
      console.log(result);
      return result.ScanResult
    } catch(e){
      throw(e)
    }
  }

  stopScanning(): void {
    this.scannerControls?.stop();
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl.create()
      .addElement(document.querySelector('.qr-hand') as HTMLElement)
      .duration(10000) // Duración 10 segundos de la animación (está en milisegundos)
      .iterations(Infinity)
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)'); // Rotar la imagen 360 grados
  }

  ionViewWillEnter() {
    this.animation?.play(); // Reproducir animación al entrar en la página
  }
  
}
