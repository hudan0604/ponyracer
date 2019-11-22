import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from '../models/race.model';
import { Subscription, Subject, interval, EMPTY } from 'rxjs';
import { PonyWithPositionModel } from '../models/pony.model';
import { tap, filter, switchMap, groupBy, mergeMap, bufferToggle, throttleTime, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  
  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription;
  error: boolean;
  winners: Array<PonyWithPositionModel>;
  betWon: boolean;
  clickSubject= new Subject<PonyWithPositionModel>();

  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('raceId');
    this.positionSubscription = this.raceService
      .get(id)
      .pipe(
        tap((race: RaceModel) => (this.raceModel = race)),
        filter(race => this.raceModel.status !== 'FINISHED'),
        switchMap(race => this.raceService.live(race.id))
      )
      .subscribe(
        positions => {
          this.poniesWithPosition = positions;
          this.raceModel.status = 'RUNNING';
        },
        error => (this.error = true),
        () => {
          this.raceModel.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(pony => pony.id === this.raceModel.betPonyId);
        }
      );

      this.clickSubject
      .pipe(
        groupBy(pony => pony.id, pony => pony.id),
        mergeMap(obs => obs.pipe(bufferToggle(obs, () => interval(1000)))),
        filter(array => array.length >= 5),
        throttleTime(1000),
        map(array => array[0]),
        switchMap(ponyId => this.raceService.boost(this.raceModel.id, ponyId).pipe(catchError(() => EMPTY)))
      )
      .subscribe(() => {});

  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

  onClick(pony: PonyWithPositionModel) {
    this.clickSubject.next(pony);
  }

  ponyById(index: number, pony: PonyWithPositionModel): number {
    return pony.id;
  }
}
