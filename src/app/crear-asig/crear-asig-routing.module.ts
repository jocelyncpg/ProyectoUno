import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAsigPage } from './crear-asig.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAsigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearAsigPageRoutingModule {}
