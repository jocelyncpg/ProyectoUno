import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaseQRPage } from './clase-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ClaseQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaseQRPageRoutingModule {}
