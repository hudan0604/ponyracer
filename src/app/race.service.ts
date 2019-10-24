import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Observable } from 'rxjs';
import * as global from './endpoints/races';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient) { }
  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(global.endpoint + '/api/races', { params });
  }
}


