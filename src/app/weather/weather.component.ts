import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;

  constructor(private weatherService: WeatherService, private navCtrl: NavController) { } // Inyecta NavController

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weatherData = data;
      },
      (error) => {
        console.error('Error al obtener el clima', error);
      }
    );
  }

  goToLogin() {
    this.navCtrl.navigateBack('/login'); 
  }
}
