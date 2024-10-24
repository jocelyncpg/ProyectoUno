import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearCursoPageRoutingModule } from './crear-curso-routing.module';

import { CrearCursoPage } from './crear-curso.page';
import { CursoComponent } from '../components/curso/curso.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCursoPageRoutingModule
  ],
  declarations: [CrearCursoPage, CursoComponent]
})
export class CrearCursoPageModule {}
