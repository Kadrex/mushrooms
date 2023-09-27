import { Injectable } from '@angular/core';
import { LatLng } from '../models/latLng';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ConfigurationService } from '../configuration/configuration.service';

export interface IsItWater {
  water: boolean
}

@Injectable({
  providedIn: 'root'
})
export class IsItWaterService {

  private baseUrl = this.configurationService.WATER_API_URL;
  private apiKey = 'bf99949c9dmsh7fbe73d2c037546p161cc0jsn2e466d2c999e';
  private apiHost = 'isitwater-com.p.rapidapi.com';

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) {
  }

  public isItWater(latLng: LatLng): Observable<IsItWater> {
    const params = new HttpParams()
      .set('latitude', latLng.lat)
      .set('longitude', latLng.lng);
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Key', this.apiKey)
      .set('X-RapidAPI-Host', this.apiHost);
    return this.http.get<IsItWater>(this.baseUrl, {params, headers});
  }
}
