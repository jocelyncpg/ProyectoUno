import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturaProfePageRoutingModule } from './asignatura-profe-routing.module';

import { AsignaturaProfePage } from './asignatura-profe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaturaProfePageRoutingModule
  ],
  declarations: [AsignaturaProfePage]
})
export class AsignaturaProfePageModule {}
