import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component'; 
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'escaner',
    loadChildren: () => import('./escaner/escaner.module').then( m => m.EscanerPageModule),
    canActivate:[authGuard]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'asignatura',
    loadChildren: () => import('./asignatura/asignatura.module').then( m => m.AsignaturaPageModule),
    canActivate:[authGuard]
  },
  { path: 'weather', component: WeatherComponent },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'crear-asig',
    loadChildren: () => import('./crear-asig/crear-asig.module').then( m => m.CrearAsigPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
