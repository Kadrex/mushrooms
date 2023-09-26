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
  private apiKey = '3619120007msh4b93fef447094c8p15a9b0jsn85eb66c5a470';
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
