import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string;


  constructor(
    private router: Router,
    private aService:AuthService
  ) {
    this.username = localStorage.getItem('username') || '';
  }

  logout() {
    this.aService.logout();
    alert("sesion cerrada")
    localStorage.removeItem('username');
    this.router.navigate(['/home']);
  }
}

