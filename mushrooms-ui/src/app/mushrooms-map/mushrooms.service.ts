import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GeoJSON} from "../models/geoJSON";
import {MushroomDialogResult} from "../models/mushroomDialogResult";
import {LatLng} from "../models/latLng";


@Injectable({
  providedIn: 'root'
})
export class MushroomsService {

  private baseUrl = 'http://localhost:8080/api/mushroomPoints';

  constructor(
    private http: HttpClient
  ) {
  }

  private constructGeoJSON(mushroomData: MushroomDialogResult, coordinates: LatLng): GeoJSON {
    return {
      type: 'Feature',
      properties: {
        id: null,
        name: mushroomData.name,
        details: mushroomData.details?.length !== 0 ? mushroomData.details : null
      }, geometry: {
        type: 'Point',
        coordinates: [coordinates.lat, coordinates.lng]
      }
    };
  }

  public getMushroomPoints(): Observable<GeoJSON[]> {
    return this.http.get<GeoJSON[]>(this.baseUrl);
  }

  public save(mushroomData: MushroomDialogResult, coordinates: LatLng): Observable<boolean> {
    const geoJSON: GeoJSON = this.constructGeoJSON(mushroomData, coordinates);
    return this.http.post<boolean>(this.baseUrl, geoJSON);
  }
}
