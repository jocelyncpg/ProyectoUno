import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaseQRPageRoutingModule } from './clase-qr-routing.module';

import { ClaseQRPage } from './clase-qr.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaseQRPageRoutingModule
  ],
  declarations: [ClaseQRPage]
})
export class ClaseQRPageModule {}
