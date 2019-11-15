import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as global from './endpoints/races';
import { RaceModel } from './models/race.model';
import { LiveRaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';
import { WsService } from './ws.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient, private wsService: WsService) { }

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
  cancelBet(raceId: number) {
    return this.http.delete(`${global.endpoint}/api/races/${raceId}/bets`);
  }
  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(map(liveRace => liveRace.ponies));
  }


}
