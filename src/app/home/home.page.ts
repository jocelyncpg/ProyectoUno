import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  usernameError: boolean = false;
  passwordError: boolean = false;

  constructor(private router: Router) {}

  home() {
    this.usernameError = !this.validateEmail(this.username);
    this.passwordError = this.password.length < 5;

    if (!this.usernameError && !this.passwordError) {
      this.router.navigate(['/login'], { queryParams: { username: this.username } });
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
