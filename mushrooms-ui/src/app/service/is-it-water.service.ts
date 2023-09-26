import {Injectable} from "@angular/core";
import {LatLng} from "../models/latLng";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

export interface IsItWater {
  water: boolean
}

@Injectable({
  providedIn: 'root'
})
export class IsItWaterService {

  url: string = 'https://isitwater-com.p.rapidapi.com/';

  constructor(
    private http: HttpClient
  ) {
  }

  public isItWater(latLng: LatLng): Observable<IsItWater> {
    const params = new HttpParams()
      .set('latitude', latLng.lat)
      .set('longitude', latLng.lng);
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Key', '3619120007msh4b93fef447094c8p15a9b0jsn85eb66c5a470')
      .set('X-RapidAPI-Host', 'isitwater-com.p.rapidapi.com');
    return this.http.get<IsItWater>(this.url, {params, headers});
  }
}
