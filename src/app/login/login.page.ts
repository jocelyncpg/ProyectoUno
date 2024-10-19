import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string;


  constructor(private router: Router) {
    this.username = localStorage.getItem('username') || '';
  }




  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/home']);
  }
}

