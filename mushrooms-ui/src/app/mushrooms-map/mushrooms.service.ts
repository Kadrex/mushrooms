import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MushroomsService {

  private baseUrl = 'http://localhost:8080/api/mushroomPoints';

  constructor(
    private http: HttpClient
  ) {
  }

  public getMushroomPoints(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
