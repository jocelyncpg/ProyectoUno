import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service'; 


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

  constructor(private router: Router, private storageService: StorageService) {}

  async home() {
    this.usernameError = !this.validateEmail(this.username);
    this.passwordError = this.password.length < 5;

    if (!this.usernameError && !this.passwordError) {
      await this.storageService.set('username', this.username);
      this.storageService.get('username')
      .then( res => console.log(res));
      this.router.navigate(['/login'], { queryParams: { username: this.username } });
    }
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
