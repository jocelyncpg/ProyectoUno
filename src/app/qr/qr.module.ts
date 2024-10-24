import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { QrPage } from './qr.page';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: QrPage }]),
    AngularFirestoreModule 
  ],
  declarations: [QrPage]
})
export class QrPageModule {}
