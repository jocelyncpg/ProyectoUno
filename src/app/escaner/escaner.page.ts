import { AfterViewInit, Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';

import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';

import { Persona } from '../agregar/agregar.page';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from 'firebase/auth';


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

        // Buscar el curso con el ID leído del QR
        const cursoIndex = cursos.findIndex((c: any) => c.idCurso === scannedResult);

        if (cursoIndex !== -1) {
          // Actualizar el valor de 'presente' a true
          cursos[cursoIndex].presente = true;

          // Guardar los cambios en Firestore
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

  startScanning(): void {
    const codeReader = new BrowserQRCodeReader();

    codeReader
      .decodeOnceFromVideoDevice(undefined, this.videoElement.nativeElement)
      .then((result) => {
        this.scannedResult = result.getText();
        alert(`ID de curso escaneado: ${this.scannedResult}`);
        if (this.scannedResult) {
          this.presente(this.scannedResult);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        this.scannerControls?.stop();
        console.log(this.scannedResult);
      })

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
