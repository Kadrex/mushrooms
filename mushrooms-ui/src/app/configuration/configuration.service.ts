import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private backendUrl = 'http://localhost:8080/api/mushroomPoints'
  private waterAPIUrl = 'https://isitwater-com.p.rapidapi.com/';

  get BASE_URL() {
    return this.backendUrl;
  }

  get WATER_API_URL() {
    return this.waterAPIUrl;
  }
}
