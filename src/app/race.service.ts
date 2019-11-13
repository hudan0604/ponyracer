import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as global from './endpoints/races';
import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(`${global.endpoint}/api/races`, { params });
  }

  get(raceId: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${global.endpoint}/api/races/${raceId}`);
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${global.endpoint}/api/races/${raceId}/bets`, { ponyId });
  }
}
