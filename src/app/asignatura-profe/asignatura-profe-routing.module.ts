import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignaturaProfePage } from './asignatura-profe.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaturaProfePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignaturaProfePageRoutingModule {}
