import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { WeatherComponent } from './weather.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [WeatherComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    HttpClientModule
  ],
  exports: [WeatherComponent]
})
export class WeatherModule { }
