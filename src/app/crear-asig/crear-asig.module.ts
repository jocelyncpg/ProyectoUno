import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAsigPageRoutingModule } from './crear-asig-routing.module';

import { CrearAsigPage } from './crear-asig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearAsigPageRoutingModule
  ],
  declarations: [CrearAsigPage]
})
export class CrearAsigPageModule {}
