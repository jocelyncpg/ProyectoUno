import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';


  constructor(
    private router: Router,
    private aService:AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      this.username = user?.email ?? 'Alumno';
    });
  }

  logout() {
    this.aService.logout();
    alert("sesion cerrada")
    localStorage.removeItem('username');
    this.router.navigate(['/home']);
  }
}

