import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaseQRPageRoutingModule } from './clase-qr-routing.module';

import { ClaseQRPage } from './clase-qr.page';

import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaseQRPageRoutingModule,
    QRCodeModule
  ],
  declarations: [ClaseQRPage]
})
export class ClaseQRPageModule {}
