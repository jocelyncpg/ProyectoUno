import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  email:string = "";
  password:string = "";
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {}
  async login(){
    try{
      await this.authService.login(this.email,this.password);
      alert("logueado exitosamente! ");
      this.router.navigate(["/login"]);
    }catch(error){alert("Error al interntar logearse! "+error)}
  }//fin login

  async register(){
    try{
      await this.authService.register(this.email,this.password);
      alert("Registrado exitosamente!" +this.email);
    }catch(error){alert("Error al interntar registrar! "+error)}
  }//fin login



}